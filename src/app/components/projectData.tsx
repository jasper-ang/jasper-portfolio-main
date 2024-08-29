export interface ProjectDetails {
  title: string;
  description: string;
  additionalDetails: string; // Will eventually be MDX content
}

export const projects: Record<string, ProjectDetails> = {
  website: {
    title: 'This is the website project description.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis porro a cumque culpa recusandae ab, aliquid cum saepe tempora laboriosam consectetur aperiam ad. Perferendis quam magnam illum sequi, praesentium culpa?',
    additionalDetails: 'Here are some additional details about the website project.', // Plain text now, MDX later
  },
  Aquila: {
    title: 'This is the Aquila project description.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis porro a cumque culpa recusandae ab, aliquid cum saepe tempora laboriosam consectetur aperiam ad. Perferendis quam magnam illum sequi, praesentium culpa?',
    additionalDetails: 'Here are some additional details about the Aquila project.', // Plain text now, MDX later
  },
  Journal: {
    title: 'This is the Aquila project description.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis porro a cumque culpa recusandae ab, aliquid cum saepe tempora laboriosam consectetur aperiam ad. Perferendis quam magnam illum sequi, praesentium culpa?',
    additionalDetails: 'Here are some additional details about the Aquila project.', // Plain text now, MDX later
  },
};
