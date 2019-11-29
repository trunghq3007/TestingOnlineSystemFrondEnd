
export interface SemesterEX {
  ID: number;
  SemesterName: number;
  StartDay: Date;
  EndDay: Date;
  Code: number;
  status: number;
  semesterExam_Users: string;

}

export interface ReportSemester {
  SemesterExam: SemesterEX;
  SemesterCreatedBy: string;
  TotalExam: number;
  TotalQuestion: number;
  EasyQuestionNumber: number;
  MediumQuestionNumber: number;
  HardQuestionNumber: number;
  TotalCandidates: number;
  TotalCandidateNotJoin: number;
  AdvPoint: number;
  LowPointNumber: number;
  MediumPointNumber: number;
  HightPointNumer: number;
}

