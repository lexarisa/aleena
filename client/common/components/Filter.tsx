import styles from '../../styles/Card.module.css';

const FilterComponent = ({milestones, tags,}) => {

    const status: String[] = ['Status','To Do','In Progress','Review','Done','Backlog'];

    const priority: String[] = ['Priority','none','Low','Medium','High','Urgent'];

    return(
        <>
            <h1>Filter</h1>
            
            <select>
                {status.map((label, index) => {
                   return(<option key={index}>{label}</option>)
                })}
            </select>
            <select>
                {priority.map((priort, index) => {
                   return(<option key={index}>{priort}</option>)
                })}
            </select>
            <select>
                {milestones.map((priort, index) => {
                   return(<option key={index}>{priort}</option>)
                })}
            </select>
            <select>
                {priority.map((priort, index) => {
                   return(<option key={index}>{priort}</option>)
                })}
            </select>

        </>
    )

}

export default FilterComponent;

// {milestones, tags, assignees, 