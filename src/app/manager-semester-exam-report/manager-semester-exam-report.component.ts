import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
// import { Exam } from '../exam';
import { ReportSemester } from '../report-semester';
import { MyserviceService } from '../myservice.service';
import { http } from '../http-header';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-manager-semester-exam-report',
  templateUrl: './manager-semester-exam-report.component.html',
  styleUrls: ['./manager-semester-exam-report.component.scss']
})
export class ManagerSemesterExamReportComponent implements OnInit {
  date: string;
  report: ReportSemester;
  Highcharts = Highcharts;
  chartOptions = null;
  startDay: string;
  endDay: string;

  constructor(private http: HttpClient,
              private router: Router,
              private myservice: MyserviceService,
              private activeRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
    });
  }

  ngOnInit() {

    const reportExId = this.activeRoute.snapshot.paramMap.get('id');
    this.http.get<string>(`http://localhost:65170/api/ExamReport/${reportExId}`, {headers: http()}).subscribe(
      value => {
        this.report = JSON.parse(value);
        this.startDay = moment(this.report.SemesterExam.StartDay).format('LL');
        this.endDay = moment(this.report.SemesterExam.EndDay).format('LL');
        this.chartOptions = {
          series: [{
            data: [
              {
                name: 'EasyQuestionNumber',
                y: this.report.EasyQuestionNumber,
                sliced: true,
                selected: true
              },
              {
                name: 'MediumQuestionNumber',
                y: this.report.MediumQuestionNumber,
              },
              {
                name: 'HardQuestionNumber',
                y: this.report.HardQuestionNumber,
              },
            ],
            type: 'pie',
          }
          ],
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
            }
          },
          title: {
            text: 'Question In Semester'
          },
        };
        console.log(value);
      });
    this.date = moment(new Date()).format('YYYY');
  }


}
