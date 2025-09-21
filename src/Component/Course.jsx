const Course = ({ course }) => {
    const total = course.parts.reduce((sum, current) => {
        return sum + current.exercises;
    }, 0);
    return (
        <>
            <Header course={course.name} />
            <Content course={course.parts} />
            total of {total} exercises
        </>
    );
};

const Header = ({ course }) => {
    return <h1>{course}</h1>;
};

const Content = ({ course }) => {
    return (
        <>
            {course.map((course) => {
                return (
                    <div key={course.id}>
                        <Parts name={course.name} exercises={course.exercises} />
                    </div>
                );
            })}
        </>
    );
};

const Parts = ({ name, exercises }) => {
    return (
        <>
            {name} {exercises}
        </>
    );
};

export default Course;
