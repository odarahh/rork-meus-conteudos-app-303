export interface CourseData {
  id: string;
  title: string;
  imageUri: string;
  deadline: string;
  currentProgress: number;
  totalLessons: number;
  progressColor: string;
  isCompleted?: boolean;
}

export const courseData: CourseData[] = [
  {
    id: '1',
    title: 'Advocacy e Sistema de Saúde',
    imageUri: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop',
    deadline: '15/12/2025',
    currentProgress: 4,
    totalLessons: 14,
    progressColor: '#EC4899',
  },
  {
    id: '2',
    title: 'Métricas de Marketing Digital',
    imageUri: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    deadline: '20/01/2026',
    currentProgress: 10,
    totalLessons: 14,
    progressColor: '#EC4899',
  },
  {
    id: '3',
    title: 'Introdução Inside Sales',
    imageUri: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop',
    deadline: '30/11/2025',
    currentProgress: 10,
    totalLessons: 12,
    progressColor: '#EC4899',
  },
  {
    id: '4',
    title: 'Seleção Performan-C',
    imageUri: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
    deadline: '15/12/2025',
    currentProgress: 93,
    totalLessons: 93,
    progressColor: '#EC4899',
    isCompleted: true,
  },
];