USE [Umbraco_Homes_Prod_21102016]
GO
/****** Object:  UserDefinedFunction [dbo].[UpdateTagsWithNewTag]    Script Date: 25/10/2016 8:57:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER FUNCTION [dbo].[UpdateTagsWithNewTag] 
(
	@existingTags varchar(max),
	@newtag varchar(max)
)
RETURNS varchar(max)
AS
BEGIN

    
	DECLARE @TagsToStrip TABLE
	(
	  Id int NOT NULL identity(1,1),
	  Tag varchar(1000)
	)


	insert into @TagsToStrip (Tag)
	select stringvalue 
	from parseJSON(@existingTags) 
	where 
		StringValue like '%food:Homes navigation:%' and 
		stringValue != 'food:Homes navigation:My Ideal House'

    DECLARE @MAXID INT, @Counter INT
	DECLARE @StripMe varchar(1000)
	SET @COUNTER = 1
	SELECT @MAXID = max(Id) from @TagsToStrip

	set @existingTags = dbo.CleanTags(@existingTags)

	WHILE (@COUNTER <= @MAXID)
	begin
	    
		select @StripMe = tag from @TagsToStrip where id = @COUNTER

		set @existingTags = REPLACE(@existingTags,',"' + @StripMe + '"','')
		set @existingTags = REPLACE(@existingTags,'"' + @StripMe + '",','')
		set @existingTags = REPLACE(@existingTags,'"food:Topic:DIY"','"food:Topic:DIY Projects"')

		SET @COUNTER = @COUNTER + 1
	end

	if (charindex('food:Homes navigation:My Ideal House', convert(varchar(max),@existingTags))) = 0
	 begin
		set @existingTags = REPLACE(@existingTags,'"]',',"' + @newtag + '"]')
	  end 

	RETURN @existingTags
END