import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  course: Course;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {

    this.courseService.get('angular-firebase').subscribe((data: any) => {
      this.course = data;
      console.log("course - edition:", data);
    });
  }

  addTask() {

    this.course.tasks.push(new Task({
      id: '',
      title: '',
      content: []
    }))
  }

  saveCourse() {
    // TODO save course in database
    console.log("saving course", this.course);

  }

}
