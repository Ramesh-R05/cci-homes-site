USE [Umbraco_Homes_Prod_21102016]
GO
/****** Object:  UserDefinedFunction [dbo].[CountOccurancesOfString]    Script Date: 21/10/2016 1:36:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
	ALTER FUNCTION [dbo].[CountOccurancesOfString]
(
    @searchString nvarchar(max),
    @searchTerm nvarchar(max)
)
RETURNS INT
AS
BEGIN
    return (LEN(@searchString)-LEN(REPLACE(@searchString,@searchTerm,'')))/LEN(@searchTerm)
END