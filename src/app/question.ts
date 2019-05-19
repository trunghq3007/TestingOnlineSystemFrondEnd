export interface Question {
    Id: string;
    Category: {
        Id: string
        , Name: string
    };
    Content: string;
    CreatedBy: string;
    UpdateBy: string;
    UpdateDate:string;
    CreatedDate: string;
    Level: string;
    QuestionType: string;
    Tags: string;


}
