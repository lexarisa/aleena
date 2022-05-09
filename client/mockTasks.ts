const tasks = [
  {
    id: 1,
    title: 'first task',
    description: 'simple description of task',
    status: 'Done',
    priority: 'Low',
    tags: ['testing'], //Tags[]
    deadline: '07-05-22',
    milestone_id: 'milestone2',
    comments: ['nice', 'wow'], // Comment[]
    githubs: ['hhhh', 'knn'], // Github[]
    created_at: 'today',
    users: ['userA', 'userB'], //User[]
    updated_at: 'today',
  },
  {
    id: 2,
    title: 'second task',
    description: 'simple description of task',
    status: 'Todo',
    priority: 'Low',
    tags: ['testing'], //Tags[]
    deadline: '07-05-22',
    milestone_id: 'milestone2',
    comments: ['nice', 'wow'], // Comment[]
    githubs: ['hhhh', 'knn'], // Github[]
    created_at: 'today',
    users: ['userC', 'userA'],
    updated_at: 'yesterday',
  },
];
export default tasks;
