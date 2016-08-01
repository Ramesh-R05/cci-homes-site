$websiteDirectory = "d:\websites\site";
$proxyAddress = "http://proxy.mgmt.local:3128";
$npmRegistryUrl = "http://npm.digital.mgmt.local:8080/";
$returnCode = 0;
$global:hasErrors = $False;

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

Function NpmInstall
{
	# set npm proxy
	npm config set proxy $proxyAddress
	npm config set https-proxy $proxyAddress

	cd $websiteDirectory

	# npm registry
	npm set registry $npmRegistryUrl

	$ErrorActionPreference = "Continue";

	$npmOutput = node $Env:NODE_JS_NPM "install" "--production" *>&1

    CleanNpmOutput($npmOutput);

	$ErrorActionPreference = "Stop";
}

Function CleanNpmOutput($npmOutput)
{
    For ($i = 0; $i -lt $npmOutput.Length; $i++)
    {
        $npmOutputEntry = $npmOutput[$i];

        if ($npmOutputEntry -is [System.Management.Automation.ErrorRecord])
        {
            $entryString = $npmOutputEntry.ToString().Trim();

			# Write-Output "entryString: '$entryString'"

            If (($entryString -eq "npm") -and ($i+1 -lt $npmOutput.Length))
            {
                For ($c = ($i+1); $c -lt $npmOutput.Length; $c++)
                {
                    $nextEntryString = ($npmOutput[$c].ToString() -replace "\s{2,}", "\s");
					$nextEntryEnds = $nextEntryString.EndsWith("`n");
					$nextEntryString = $nextEntryString.Trim();
                    $i = $c;

					# Write-Output "nextEntryString: '$nextEntryString'"

					If ($nextEntryString.Length -eq 0) { continue }

                    If ($nextEntryString -eq "npm")
                    {
                        $i--;
                        break;
                    }

                    $entryString = $entryString + " " + ($nextEntryString -replace "`n", [String]::Empty);

                    If ($nextEntryEnds) { break }
                }
            }

			# Write-Output "entryString final: '$entryString'"

			$entryString = $entryString.Trim()

            If ($entryString.StartsWith("npm ERR!"))
            {
                $Host.UI.WriteErrorLine($entryString);
                $global:hasErrors = $True;
            }
            ElseIf (($entryString -ne "npm") -and ($entryString.Length -gt 0))
            {
                Write-Output $entryString;
            }
        }
        ElseIf ($npmOutputEntry.Length -gt 0)
        {
			$tmp = $npmOutputEntry.ToString().Trim();

			If (($tmp -ne "npm") -and ($tmp.Length -gt 0))
			{
				Write-Output $tmp;
			}
        }
    }
}

# code
NpmInstall;

ChangeServiceStatus -serviceName "nxlog" -newStatus "start";
ChangeServiceStatus -serviceName "NodeServer3000" -newStatus "start";

If ($hasErrors)
{
    Exit 1;
}
Else
{
    Exit 0;
}
