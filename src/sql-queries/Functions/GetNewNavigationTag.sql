USE [Umbraco_Homes_Prod_21102016]
GO
/****** Object:  UserDefinedFunction [dbo].[GetNewNavigationTag]    Script Date: 21/10/2016 1:35:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER FUNCTION [dbo].[GetNewNavigationTag] 
(
	@tags varchar(max)
)
RETURNS varchar(max)
AS
BEGIN
	

	DECLARE @newNavTag varchar(max)


	set @newNavTag = (select top 1 [column 2] from TagNavMapping a
					 INNER JOIN parseJSON(@tags) b on b.stringValue = a.[column 1]
					 order by [column 0] desc)
	
	RETURN @newNavTag
END





