export enum endpoint {
  templeByID = 'templates/download',
  files = 'files',
}


export interface Task {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
  personas: Persona[];  // Include the personas associated with the task
}

export interface Persona {
  userId: number;
  nombreCompleto: string;
  edad: number;
  habilidades: Habilidad[];
}

export interface Habilidad {
  habilidad: string;
}