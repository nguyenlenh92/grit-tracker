interface CourseType {
    id: number,
    class_code: string,
    class_name: string,
    grade: string,
    notes: string,
}

// interface SemesterTableType {
// 	semester: string,
// 	courses: CourseType[],
// }

interface MapToObject {
    [key: string]: CourseType[]
}

interface RequirementType {
    name: string,
    satisfies: boolean,
    satisfy_condition: string
}


export type { CourseType, MapToObject, RequirementType }