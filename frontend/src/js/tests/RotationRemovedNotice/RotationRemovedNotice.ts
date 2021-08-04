import { TaskDisplay, UserInterface } from "../../io";
import { ResultLog } from "../../metrics/ResultLog";
import { Task } from "../../taskBase";
import { EmptyTaskcontroller } from "../../taskBase/EmptyTaskController";

export class RotationRemovedNotice extends Task
{
    constructor()
    {
        super(new RotationRemovedNoticeDisplay(), new EmptyTaskcontroller());
        this.SetExplicitSubmissionRequired(true);
    }

    public Submit(): void
    {
        this.Controller.Submit([]);
    }

    public LogResults(log: ResultLog): void
    {
    }
}

class RotationRemovedNoticeDisplay extends TaskDisplay
{
    public Display(screen: UserInterface): void {
        screen.ViewModeContent();
        screen.ContentContainer().html(template);
    }
}

let template = `
<div style="text-align: center; padding-left: 100px; padding-right: 100px;">
    <p>
        Spatial ability was assessed using the revised Purdue Spatial Visualization Test: Visualization of Rotations (PSVT:R), a standard psychometric instrument for spatial ability. The test consists of 30 questions. The participant is provided with an asymmetric block, and shown a rotated version of that block. They are then provided with a second asymmetric block, and asked to infer what the second block would look like if it were rotated the same way as the first block. The participant must select the correctly rotated version of the second block from a series of distractors.
    </p>

    <p>
        Dr. So Yoon Yoon (Dept. of Engineering Education, University of Cincinnati) providedthe PSVT:R  stimuli and answer key. Researchers wishing to see the PSVT:R stimuli or use the psychometric instrument should reach out to Dr. Yoon directly (yoons5@ucmail.uc.edu) Below is an example question from the PSVT:R (example question not include in 30 questions used to assess people’s spatial ability).
    </p>

    <p>
        <img src="images/PSVT-R_Test_Page_02.jpg" style="max-width:80%;"/>
    </p>

    <p>
        The citation for the instrument is:Yoon, S. Y. (2011). Revised Purdue Spatial Visualization Test: Visualization of Rotations (Revised PSVT:R) [Psychometric Instrument].
    </p>

    <p>
        Psychometric properties of the PSVT:R are detailed in previous papers.Yoon, S. Y. (2011). Psychometric properties of the Revised Purdue Spatial Visualization Tests: Visualization of Rotations (The Revised PSVT:R) (Doctoral Dissertation). Retrieved from ProQuest Dissertations and Theses. (Order Number: 3480934).
    </p>

    <p>
        Maeda, Y., Yoon, S. Y., Kim-Kang, K., & Imbrie, P. K. (2013). Psychometric properties of the Revised PSVT:R for measuring the first year engineering students’ spatial ability. International Journal of Engineering Education, 29, 763-776.
    </p>

    <p>
        Maeda, Y., & Yoon, S. Y. (2013). A meta-Analysis on gender differences in mental rotation ability measured by the Purdue Spatial Visualization Tests: Visualization of Rotations (PSVT:R). Educational Psychology Review, 25, 69-94. https://doi.org/10.1007/s10648-012-9215-x 
    </p>

    <p>
        Maeda, Y., & Yoon, S. Y. (2016). Are gender differences in spatial ability real or an artifact?: Evaluation of measurement invariance on The Revised PSVT:R. Journal of Psychoeducational Assessment, 34, 397-403. https://doi.org/10.1177/0734282915609843 
    </p>

    <p>
        Yoon, S. Y., & Min, K-H. (2016). College students’ performance in an introductory atmospheric science course: Associations with spatial ability. Meteorological Applications, 23, 409-419. doi: 10.1002/met.1565
    </p>

    <p>
        Yoon, S. Y., & Mann, E. L. (2017). Exploring spatial ability of undergraduate students: Association with gender, STEM majors, and gifted program experiences. Gifted Child Quarterly, 61(4), 313-327. https://doi.org/10.1177/0016986217722614
    </p>
</div>
`