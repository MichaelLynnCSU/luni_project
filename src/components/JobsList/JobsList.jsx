// JobsList.jsx
import JobCard from '../JobCard/JobCard.jsx';

export default function JobsList({ jobs }) {


    return (
        <div className="jobs-list">
            {/* Map through jobs and display card for each */}
            {jobs.map(job => (
                <JobCard
                    key={job.title}
                    title={job.title}
                    company={job.company}
                />
            ))}
        </div>
    );
}
