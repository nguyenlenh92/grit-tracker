enum gradeMapping {
    F,
    D,
    C,
    B,
    A,
}
interface CourseType {
    code: string,
    grade: string,
    credits: number,
    attributes?: string[]
}

export default class CMSC_BS_Requirement {
    public requirements = {
        GPA: false,
        LN_10: false,
        LN_12: false,
        LN_20: false,
        LN_25: false,
        LN_40: false,
        LN_50: false,
        LN_55: false,
        LN_60: false,
        LN_70: false,
        RQ_3006: false,
        RQ_3007: false,
        RQ_3008: false,
        RQ_3009: false,
        RQ_3022: false,
        RQ_3023: false,
        RQ_3028: false,
        RQ_3029: false,
        RQ_3092: false,
        RQ_3832_10: false,
        RQ_3463: false,
        UPPER_45: false,
    }



    constructor(){
        this.requirements = {
            GPA: false,
            LN_10: false,
            LN_12: false,
            LN_20: false,
            LN_25: false,
            LN_40: false,
            LN_50: false,
            LN_55: false,
            LN_60: false,
            LN_70: false,
            RQ_3006: false,
            RQ_3007: false,
            RQ_3008: false,
            RQ_3009: false,
            RQ_3022: false,
            RQ_3023: false,
            RQ_3028: false,
            RQ_3029: false,
            RQ_3092: false,
            RQ_3832_10: false,
            RQ_3463: false,
            UPPER_45: false,
        }
    }

    public satisfyRequirements(courses: CourseType[]) {
        this.satisfy_GPA(courses);
        this.satisfy_LN_12(courses);
        this.satisfy_LN_20(courses);
        this.satisfy_LN_25(courses);
        this.satisfy_LN_40(courses);
        this.satisfy_LN_50(courses);
        this.satisfy_LN_55(courses);
        this.satisfy_LN_60(courses);
        this.satisfy_LN_70(courses);
        this.satisfy_RQ_3006(courses);
        this.satisfy_RQ_3007(courses);
        this.satisfy_RQ_3008(courses);
        this.satisfy_RQ_3009(courses);
        this.satisfy_RQ_3022(courses);
        this.satisfy_RQ_3023(courses);
        this.satisfy_RQ_3028(courses);
        this.satisfy_RQ_3029(courses);
        this.satisfy_RQ_3092(courses);
        this.satisfy_RQ_3832_10(courses);
        this.satisfy_RQ_3463(courses);
        this.satisfy_upper_45(courses);
    }
    private satisfy_GPA(courses: CourseType[]){
        var total_grade_points = 0
        var maximum_credits = 0
        for (const course of courses){
            var gradeMap: string = ''
            if (course.grade !== ' '){
                gradeMap = course.grade.toString()
            }
            else {
                gradeMap = 'A'
            }
            total_grade_points += (gradeMapping[gradeMap] * course.credits)
            maximum_credits += course.credits
        }

        const gpa = (total_grade_points / maximum_credits)
        if (gpa >= 2.0){
            this.requirements.GPA = true
        }
        else {
            this.requirements.GPA = false
        }
    }
    private satisfy_RQ_3023(courses: CourseType[]){
        var total_credits = 0
        for (const course of courses){
            total_credits += course.credits
        }
        if (total_credits >= 120){
            this.requirements.RQ_3023 = true
        }
        else {
            this.requirements.RQ_3023 = false
        }
    }
    private satisfy_upper_45(courses: CourseType[]){
        const regex = /3|4\d\d/;
        const upper_level_courses = courses.filter((course) => {return course.code.search(regex) !== -1})
        var total_credits = 0
        for (const course of upper_level_courses){
            total_credits += course.credits
        }
        if (total_credits >= 45){
            this.requirements.UPPER_45 = true
        }
        else {
            this.requirements.UPPER_45 = false
        }
    }

    private satisfy_RQ_3463 (courses: CourseType[]){
        const writing_intensive_courses = courses.filter((course) => { return course.attributes?.find(attribute => attribute === "Writing Intensive") !== undefined })
        writing_intensive_courses.length >= 1 ? this.requirements.RQ_3463 = true : this.requirements.RQ_3463 = false

    }

    private satisfy_RQ_3028 (courses: CourseType[]){
        const a_h_courses = courses.filter((course) => { return course.attributes?.find(attribute => attribute === "Arts and Humanities") !== undefined })
        a_h_courses.length >= 3 ? this.requirements.RQ_3028 = true : this.requirements.RQ_3028 = false
    }

    private satisfy_RQ_3022(courses: CourseType[]) {
        const english_courses = courses.filter((course) => { return course.code === "ENGL 100" })
        english_courses.length >= 1 ? this.requirements.RQ_3022 = true : this.requirements.RQ_3022 = false
    }

    private satisfy_RQ_3029 (courses: CourseType[]) {
        const s_s_courses = courses.filter((course) => { return course.attributes?.find(attribute => attribute === "Social Sciences") !== undefined })
        s_s_courses.length >= 3 ? this.requirements.RQ_3029 = true : this.requirements.RQ_3029 = false
    }

    private satisfy_RQ_3006(courses: CourseType[]) {
        const math_courses = courses.filter((course) => { return course.attributes?.find(attribute => attribute === "Mathematics") !== undefined })
        math_courses.length >= 1 ? this.requirements.RQ_3006 = true : this.requirements.RQ_3006 = false
    }

    private satisfy_RQ_3007(courses: CourseType[]) {
        const science_non_lab = courses.filter((course) => { return course.attributes?.find(attribute => attribute === "Science (non-lab)") !== undefined })
        const science_with_lab = courses.filter((course) => { return course.attributes?.find(attribute => attribute === "Science Plus Lab") !== undefined })
        
        science_non_lab.length >= 1 && science_with_lab.length >= 1 ? this.requirements.RQ_3007 = true : this.requirements.RQ_3007 = false
    }
    
    private satisfy_RQ_3008 (courses: CourseType[]) {
        const culture_courses = courses.filter((course) => { return course.attributes?.find(attribute => attribute === "Culture") !== undefined })
        culture_courses.length >= 1 ? this.requirements.RQ_3008 = true : this.requirements.RQ_3008 = false
    }

    private satisfy_RQ_3009 (courses: CourseType[]) {
        const language_courses = courses.filter((course) => { return course.attributes?.find(attribute => attribute === "Language") !== undefined })
        const regex = /2\d\d/
        var number_200_level_courses = 0
        for (const course of language_courses){
            if (course.code.search(regex) !== -1){
                number_200_level_courses += 1
            }
        }
        number_200_level_courses >= 1 ? this.requirements.RQ_3009 = true : this.requirements.RQ_3009 = false
    }

    private satisfy_RQ_3092 (courses: CourseType[]) {
        var conditions = [false, false, false]
        
        for (const course of courses){
            if (course.code === "CMSC 201"){
                if (course.grade === "A" || course.grade === "B" || course.grade === " " || course.grade === ""){
                    conditions[0] = true
                }
            }
            if (course.code === "CMSC 202") {
                if (course.grade === "A" || course.grade === "B" || course.grade === " " || course.grade === "") {
                    conditions[1] = true
                }
            }
            if (course.code === "CMSC 203") {
                if (course.grade === "A" || course.grade === "B" || course.grade === "C" || course.grade === " " || course.grade === "") {
                    conditions[2] = true
                }
            }
        }

        conditions.every((value) => value === true) ? this.requirements.RQ_3092 = true : this.requirements.RQ_3092 = false
    }

    private satisfy_RQ_3832_10 (courses: CourseType[]) {
        var CMSC_core_courses = [
        "CMSC 201", 
        "CMSC 202", 
        "CMSC 203", 
        "CMSC 304", 
        "CMSC 313", 
        "CMSC 331", 
        "CMSC 341", 
        "CMSC 411", 
        "CMSC 421", 
        "CMSC 441"]
        
        for (const course of courses){
            var index = CMSC_core_courses.indexOf(course.code)
            if (index !== -1){
                CMSC_core_courses.splice(index, 1)
            }
        }
        
        CMSC_core_courses.length === 0 ? this.requirements.RQ_3832_10 = true : this.requirements.RQ_3832_10
    }

    private satisfy_LN_12 (courses: CourseType[]) {
        this.requirements.LN_12 = false
        for (const course of courses){
            if (course.code === "CMSC 447"){
                this.requirements.LN_12 = true
            }
        }
    }

    private satisfy_LN_20 (courses: CourseType[]) {
        var math_courses = [
            "MATH 151",
            "MATH 152",
            "MATH 221"
        ]
        for (const course of courses) {
            var index = math_courses.indexOf(course.code)
            if (index !== -1) {
                math_courses.splice(index, 1)
            }
        }

        math_courses.length === 0 ? this.requirements.LN_20 = true : this.requirements.LN_20
    }

    private satisfy_LN_25 (courses: CourseType[]) {
        this.requirements.LN_25 = false
        for (const course of courses){
            if (course.code === "STAT 355"){
                this.requirements.LN_25 = true
            }
        }
    }

    private satisfy_LN_40 (courses: CourseType[]) {
        this.requirements.LN_40 = false
    }

    private satisfy_LN_50 (courses: CourseType[]) {
        this.requirements.LN_50 = false
    }

    private satisfy_LN_55 (courses: CourseType[]) {
        const science_courses = courses.filter((course) => { return course.attributes?.find(attribute => attribute === "Science (non-lab)") !== undefined })
        science_courses.length >= 3 ? this.requirements.LN_55 = true : this.requirements.LN_55 = false
    }

    private satisfy_LN_60 (courses: CourseType[]) {
        this.requirements.LN_60 = false
    }

    private satisfy_LN_70 (courses: CourseType[]) {
        this.requirements.LN_70 = false
    }
}