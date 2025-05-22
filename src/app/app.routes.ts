// app.routes.ts
import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { EducationComponent } from './pages/education/education.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { SkillsComponent } from './pages/skills/skills.component';

export const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: { animation: 'about' },
  },
  {
    path: 'experience',
    component: ExperienceComponent,
    data: { animation: 'experience' },
  },
  {
    path: 'education',
    component: EducationComponent,
    data: { animation: 'education' },
  },
  {
    path: 'skills',
    component: SkillsComponent,
    data: { animation: 'skills' },
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: { animation: 'projects' },
  },
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: '**', redirectTo: 'about' },
];
