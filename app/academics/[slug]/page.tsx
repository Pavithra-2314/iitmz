import styles from "./page.module.scss";
import courses from "@/data/courses";
import Img from "@/components/image";
import { Accordion, AccordionItem } from "@/components/accordion";
import Eligilibity from "@/components/eligibility";
import {
  AiOutlineUnorderedList,
  AiOutlineCalendar,
  AiOutlineCheck,
} from "react-icons/ai";
import { BiBuilding } from "react-icons/bi";
import { GoGlobe } from "react-icons/go";

const dynamicParams = false;
export { dynamicParams };

export async function generateStaticParams() {
  return Object.values(courses).map((course) => ({
    slug: course.slug,
  }));
}

export default function CourseDetail({ params }: { params: { slug: string } }) {
  const course = Object.values(courses).find(
    (course) => course.slug === params.slug
  );

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Img
          src="/cd3x.png"
          alt="data science course image"
          width={900}
          height={600}
        />
      </div>
      <div className="container">
        <section className={styles.body}>
          <h2>{course?.title}</h2>
          <div className={styles.meta}>
            <div className={styles.item}>
              <AiOutlineCalendar />
              <p>Duration</p>
              <span>{course?.meta.duration}</span>
            </div>
            <div className={styles.item}>
              <AiOutlineUnorderedList />
              <p>Total Credits</p>
              <span>{course?.meta.credits}</span>
            </div>
            <div className={styles.item}>
              <BiBuilding />
              <p>School of</p>
              <span>{course?.meta.department}</span>
            </div>
            <div className={styles.item}>
              <GoGlobe />
              <p>Language</p>
              <span>{course?.meta.language}</span>
            </div>
          </div>
          <div className={styles.description}>
            <h4>Description</h4>
            <p>{course?.desc}</p>
          </div>
          <div className={styles.prospects}>
            <h4>Job Prospects</h4>
            <p>{course?.prospects.desc}</p>
            <ul>
              {course?.prospects.points.map((point) => (
                <li key={point}>
                  <AiOutlineCheck />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Eligibility Criteria</h4>
            <Eligilibity type="SINGLE" courseSlug={params.slug} />
          </div>
          <div className={styles.curriculum}>
            <h4>Curriculum</h4>
            <Accordion>
              {course?.curriculum.semesters.map((semester, index) => (
                <AccordionItem
                  key={semester.title}
                  initialEntered={index === 0}
                >
                  <div>
                    <h5>{semester.title}</h5>
                    <p>{`${semester.credits} credits`}</p>
                  </div>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Course Name</th>
                        <th title="To know what (L, T, E, P, O) is hover your mouse pointer over it">
                          Category
                        </th>
                        <th title="Lectures">L</th>
                        <th title="Tutorials">T</th>
                        <th title="Extended Tutorials">E</th>
                        <th title="Practicals">P</th>
                        <th title="Outside Classroom">O</th>
                        <th title="Total Credits">Total Credits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {semester.courses.map((course) => (
                        <tr key={course.courseName}>
                          <td data-cell="Name:">{course.courseName}</td>
                          <td data-cell="Category">{course.category}</td>
                          <td data-cell="Lectures">{course.L}</td>
                          <td data-cell="Tutorials">{course.T}</td>
                          <td data-cell="Extended Tutorials">{course.E}</td>
                          <td data-cell="Practicals">{course.P}</td>
                          <td data-cell="Outside Classroom">{course.O}</td>
                          <td data-cell="Total">{course.totalCredits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </section>
  );
}
