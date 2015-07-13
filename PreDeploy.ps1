$websiteDirectory = "d:\websites\site";
$tmpDirectory = "d:\$([System.Guid]::NewGuid().ToString())";
$global:hasErrors = $False;

Function PurgeWebsiteFiles 
{
	If (!(Test-Path $websiteDirectory))
	{
		Write-Host "$pathToDeployFiles does not exist, no files to purge...";
		Return;
	}
    
    # first, delete node_modules folder...
    mkdir $tmpDirectory
    robocopy /MIR $tmpDirectory "$websiteDirectory\node_modules"
    rmdir $tmpDirectory

	# temp - need to exclude deleting the cms directory
	GetFiles $websiteDirectory @("*.log", "*.txt", "$websiteDirectory\cms\*") | % { 
		# don't remove if it's a directory (it might have children we don't want to remove)
        If (Test-Path $_.FullName -PathType container)
        {
            Return
        }

		# in case it was removed in the steps in between
		If (Test-Path $_.FullName)
		{
			Write-Host "Removing $($_.FullName)"; 
			Remove-Item -Force $_.FullName -ErrorAction SilentlyContinue;
		}
    }
}

Function GetFiles($path, [string[]]$exclude)
{
	ForEach ($item in Get-ChildItem $path)
	{
		If ($exclude | Where {$item.FullName -Like $_}) { Continue }

        $item
        
        If (Test-Path $item.FullName -PathType Container)
        {
            GetFiles $item.FullName $exclude
        }
	}
}

Function ChangeServiceStatus
{
    Param([string]$serviceName, [string]$newStatus)

	$statusRunning = "running";
	$service = Get-Service $serviceName;
	$currentStatus = $service.Status;
	$i = 0;
	$waitTimeInSeconds = 5;
	$maxWaitAttempts = 5;

	Write-Output "$serviceName status: '$currentStatus', requesting '$newStatus'";

    Try
    {
		$numErrors = $Error.Count;

        If ($newStatus -eq "stop" -and $currentStatus -ieq $statusRunning)
        {
            $service.Stop();

			AwaitServiceStatus -serviceName $serviceName -expectedStatus "Stopped";
        }
        ElseIf ($newStatus -eq "start" -and $currentStatus -ine $statusRunning)
        {
            $service.Start();

			AwaitServiceStatus -serviceName $serviceName -expectedStatus $statusRunning;
        }

		If ($numErrors -ne $Error.Count)
		{
			throw [System.Exception] $Error[0];
		}

		Write-Output "$serviceName status updated: $((Get-Service $serviceName).Status)";
    }
    Catch
    {
        $Host.UI.WriteErrorLine($_.Exception.Message)
        $global:hasErrors = $True;
    }
}

Function AwaitServiceStatus($serviceName, $expectedStatus, $waitTimeInSeconds = 5, $maxWaitAttempts = 5)
{
	$service = Get-Service $serviceName;

	While ($service.Status -ine $expectedStatus)
	{
		If ($i -eq $maxWaitAttempts)
		{
			throw [System.Exception] "Waited $($i * $waitTimeInSeconds) seconds and service still not running, terminating...";
		}

		Write-Output "Waiting for $serviceName to be '$expectedStatus', currently: $($service.Status)...";
		Start-Sleep -seconds $waitTimeInSeconds;
		$i++;
		$service = Get-Service $serviceName;
	}
}

# code
ChangeServiceStatus -serviceName "NodeServer3000" -newStatus "stop";
ChangeServiceStatus -serviceName "nxlog" -newStatus "stop";
ChangeServiceStatus -serviceName "WAS" -newStatus "stop";

new-netfirewallrule -displayname http_80 -direction inbound -action allow -localport 80 -protocol TCP

PurgeWebsiteFiles

If ($hasErrors)
{
    Exit 1;
}
Else
{
    Exit 0;
}