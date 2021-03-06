USE [Umbraco_Homes_Prod_21102016]
GO
/****** Object:  UserDefinedFunction [dbo].[GetNavigationTag]    Script Date: 21/10/2016 1:36:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





ALTER FUNCTION [dbo].[GetNavigationTag] 
(
	@tags varchar(max)
)
RETURNS varchar(max)
AS
BEGIN
 
	DECLARE @navTag varchar(max)

	set @navTag =  SUBSTRING(convert(varchar(max),@tags), 
		   charindex('food:Homes navigation:', convert(varchar(max),@tags)), 
     	   charindex('"', convert(varchar(max),@tags), charindex('food:Homes navigation:', convert(varchar(max),@tags), 1)) - charindex('food:Homes navigation:', convert(varchar(max),@tags), 1))
		   

	RETURN @navTag
END




