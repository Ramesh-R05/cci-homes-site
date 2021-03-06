USE [Umbraco_Homes_Prod_21102016]
GO
/****** Object:  UserDefinedFunction [dbo].[GetNodeUrlV3]    Script Date: 25/10/2016 10:16:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER FUNCTION [dbo].[GetHomesNodeUrl] 
(
	@nodeId int
)
RETURNS varchar(max)
AS
BEGIN
	
	DECLARE @url varchar(max)
	DECLARE @parentNodeId int
	DECLARE @level int
	DECLARE @contentTypeId int

	DECLARE @dateFolderTypeId int
	SET @dateFolderTypeId = 1146

	SELECT 
		@url = [text],
		@parentNodeId = parentID,
		@level = [level]
	FROM umbracoNode 
	WHERE id = @nodeId

	SELECT 
		@contentTypeId = contentType 
	FROM cmsContent 
	WHERE nodeId = @nodeId

	SET @url = LOWER(REPLACE(@url, '-&-', '-'))
	SET @url = LOWER(REPLACE(@url, ' - ', '-'))
    SET @url = LOWER(REPLACE(@url, '  ', '-'))
	SET @url = LOWER(REPLACE(@url, ' ', '-'))
	
	SET @url = LOWER(REPLACE(@url, '&', ''))
	SET @url = LOWER(REPLACE(@url, '''', ''))
	SET @url = LOWER(REPLACE(@url, ':', ''))

	SET @url = LOWER(REPLACE(@url, '"', ''))
	SET @url = LOWER(REPLACE(@url, ',', ''))
	SET @url = LOWER(REPLACE(@url, '(', ''))
	SET @url = LOWER(REPLACE(@url, ')', ''))
	SET @url = LOWER(REPLACE(@url, '.', ''))
	SET @url = LOWER(REPLACE(@url, ';', ''))
	SET @url = LOWER(REPLACE(@url, '/', ''))
	SET @url = LOWER(REPLACE(@url, '#', ''))
	SET @url = LOWER(REPLACE(@url, '‘', ''))
	SET @url = LOWER(REPLACE(@url, '’', ''))
	SET @url = LOWER(REPLACE(@url, '+', 'plus'))
	SET @url = LOWER(REPLACE(@url, '*', 'star'))
	SET @url = LOWER(REPLACE(@url, '?', ''))
	SET @url = LOWER(REPLACE(@url, '–', ''))
	SET @url = LOWER(REPLACE(@url, '“', ''))
	SET @url = LOWER(REPLACE(@url, '”', ''))
	SET @url = LOWER(REPLACE(@url, '$', ''))
	SET @url = LOWER(REPLACE(@url, '%', ''))
	/*
	SET @url = LOWER(REPLACE(@url, 'æ', 'ae'))
	SET @url = LOWER(REPLACE(@url, 'ø', 'ie'))
	SET @url = LOWER(REPLACE(@url, 'å', 'aa'))
	SET @url = LOWER(REPLACE(@url, 'ä', 'ae'))
	SET @url = LOWER(REPLACE(@url, 'ö', 'oe'))
	SET @url = LOWER(REPLACE(@url, 'ü', 'ue'))
	SET @url = LOWER(REPLACE(@url, 'ß', 'ss'))
	SET @url = LOWER(REPLACE(@url, 'Ä', 'ae'))
	SET @url = LOWER(REPLACE(@url, 'Ö', 'oe'))
	SET @url = LOWER(REPLACE(@url, 'é', 'e'))
	*/


     SET @url =  'http://www.homestolove.com.au/' + LTRIM(RTRIM(@url)) + '-' + convert(varchar(max), @nodeId)
	

	RETURN @url

END

