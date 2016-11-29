USE [Umbraco_Homes_Prod_21102016]
GO

/****** Object:  UserDefinedFunction [dbo].[UpdateTagsWithNewTag]    Script Date: 25/10/2016 9:32:07 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



Alter FUNCTION [dbo].[CleanTags] 
(
	@tags varchar(max)
)

RETURNS varchar(max)
AS
BEGIN

    

	set @tags = replace(replace(convert(varchar(max),@tags),char(13),''),char(10),'')
	set @tags = replace(replace(convert(varchar(max),@tags),char(13),''),char(10),'')
	set @tags = replace(@tags,' "','"')
	set @tags = replace(@tags,'" ','"')
	set @tags = replace(@tags,'  "','"')
	set @tags = replace(@tags,'"  ','"')
	set @tags = replace(@tags,'   "','"')
	set @tags = replace(@tags,'"   ','"')


	RETURN @tags
END
GO


