export interface IArticles {
    articleID : number,
    dateline : string,
    byline : string,
    slug : string,
    title : string,
    articleBody : string,
    featuredImageURL : string,
    featuredImageCaption : string,
    tags : string,
    createdDate : Date,
    countryID : number,
    country : string,
    articleTypeID : number,
    articleType : string,
    publicationID : number,
    publication : string,
    authorID : number,
    author : string,
    categoryID : number,
    categoryName : string,
    subCategoryID : number,
    subCategoryName : string,
    issueID : number,
    issue : string,
    showinTA : boolean,
    showinMAG : boolean,
    refNo : number,
}