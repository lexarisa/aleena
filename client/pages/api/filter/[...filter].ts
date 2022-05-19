

export const filterData = async (user_id, project_id) => {

  const milestones = await fetch(`https://ae99-45-130-134-153.eu.ngrok.io/milestone`, {
    // const response = await fetch(`${process.env.BASEURL}/milestone`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!milestones.ok) {
    const message = `An error has occurred: 404`;
    throw new Error(message);
  }
};

const fetchAllMilestones = async (user_id: number, project_id: number) => {

    const milestones = await fetch(`https://ae99-45-130-134-153.eu.ngrok.io/milestone`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    
    if (!milestones.ok) {
    const message = `An error has occurred: 404`;
    throw new Error(message);
    }

    return await milestones.json();
}

const fetchAllTags = async (user_id: number, project_id: number) => {

    const tags = await fetch(`https://ae99-45-130-134-153.eu.ngrok.io/tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    
    if (!tags.ok) {
    const message = `An error has occurred: 404`;
    throw new Error(message);
    }

    return await tags.json();
}

const fetchAllAssignees = async (user_id: number, project_id: number) => {

    const assignees = await fetch(`https://ae99-45-130-134-153.eu.ngrok.io/assignees`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    
    if (!assignees.ok) {
    const message = `An error has occurred: 404`;
    throw new Error(message);
    }

    return await assignees.json();
}

const fetchAllAssignees = async (user_id: number, project_id: number) => {

    const assignees = await fetch(`https://ae99-45-130-134-153.eu.ngrok.io/assignees`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    
    if (!assignees.ok) {
    const message = `An error has occurred: 404`;
    throw new Error(message);
    }

    return await assignees.json();
}