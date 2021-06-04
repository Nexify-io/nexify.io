import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { Course } from '../model/course.model';
import { CourseService } from '../services/course.service';

@Injectable({
    providedIn: 'root',
})
export class CourseResolver {

    constructor(
        private courseService: CourseService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {

        // Check if the note id is in the curent route
        let id = route.paramMap.get('id');

        // Check if the project is the same as the previous one
        if (id) {
            // Otherwise, retrieve it from database
            return this.courseService.get(id).pipe(
                take(1),
                catchError(
                    err => {
                        console.error(err);
                        this.router.navigate(['']);
                        return EMPTY
                    }
                )
            )
        } else {
            return EMPTY;

        }
    }
}