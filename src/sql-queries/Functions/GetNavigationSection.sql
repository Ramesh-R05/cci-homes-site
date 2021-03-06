USE [Umbraco_Homes_Prod_21102016]
GO
/****** Object:  UserDefinedFunction [dbo].[GetNavigationSection]    Script Date: 21/10/2016 1:36:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER FUNCTION [dbo].[GetNavigationSection] 
(
	@tags varchar(max)
)
RETURNS varchar(max)
AS
BEGIN
	
	DECLARE @url varchar(max)
	DECLARE @parentNodeId int
	DECLARE @level int


	set @url = SUBSTRING(convert(varchar(max),@tags), 
		   charindex('food:Homes navigation:', convert(varchar(max),@tags)), 
     	   charindex('"', convert(varchar(max),@tags), charindex('food:Homes navigation:', convert(varchar(max),@tags), 1)) - charindex('food:Homes navigation:', convert(varchar(max),@tags), 1))

	
	RETURN @url
END

