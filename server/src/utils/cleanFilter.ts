export const cleanFilter = 
(   query: any[], 
    project_id: number, 
    filterPriority?: string[], 
    filterStatus?: string[], 
    filterMileIds?: number[], 
    filterAssignees?: number[], 
    filterTags?: string[]
): any => {

    if (query.length) {
        return query[0].filter((el: any) => {
            const check = [];
    
           if (project_id) {
             if (project_id === el.project_id) {
                check.push(true)
              } else {
                check.push(false)
              }
           }
           
           if (filterPriority) {
               if (filterPriority.includes(el.priority)) {
                    check.push(true)
                } else {
                    check.push(false)
                }
            }
    
            if (filterStatus) {
                if (filterStatus.includes(el.status)) {
                    check.push(true)
                } else {
                    check.push(false)
                }
            }
    
            if (filterMileIds) {
                if (filterMileIds.includes(el.milestone_id)) {
                    check.push(true)
                } else {
                    check.push(false)
                }
            }
    
            if (filterAssignees) {
                if (filterAssignees.includes(el.users.user_id)) {
                    check.push(true)
                } else {
                    check.push(false)
                }
            }
    
            if (filterTags) {
                if (filterTags.includes(el.tags.title)) {
                    check.push(true)
                } else {
                    check.push(false)
                }
            }
    
    
            if (check.includes(false)) {
                return;
            } else {
                return el
            }   
           
        })
    } else {
        return
    }

}