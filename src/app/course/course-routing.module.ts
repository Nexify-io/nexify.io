import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseResolver } from '../resolvers/course.resolver';
import { ChapterResolver } from '../resolvers/chapter.resolver';
import { CourseHomeViewComponent } from './view/course-home-view/course-home-view.component';
import { CourseComponent } from './course/course.component';
import { CourseHomeEditComponent } from './edit/course-home-edit/course-home-edit.component';
import { ChapterEditComponent } from './edit/chapter-edit/chapter-edit.component';
import { ChapterViewComponent } from './view/chapter-view/chapter-view.component';

const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: ':id',
        children: [
            {
                path: '',
                component: CourseComponent,
                resolve: {
                    course: CourseResolver,
                },
                children: [
                    {
                        path: '',
                        component: CourseHomeViewComponent
                    },
                    {
                        path: 'editor',
                        component: CourseHomeEditComponent,
                    },
                    {
                        path: ':chapter',
                        resolve: {
                            chapter: ChapterResolver,
                        },
                        children: [
                            {
                                path: '',
                                component: ChapterViewComponent
                            },
                            {
                                path: 'editor',
                                component: ChapterEditComponent,
                            }
                        ]
                    }
                ]

            },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }
