import ProjectsHeading from "@/components/dashboard/projects/heading";
import { ProjectsList } from "@/components/dashboard/projects/list";
import ErrorCard from "@/components/error/ErrorCard";
import PageGetSettings from "@/lib/fetch/page/settings";
import GetProjects from "@/lib/fetch/project/all";
import GetProject from "@/lib/fetch/project/data";
import GetUserDetails from "@/lib/fetch/user/getDetails";
import GetUserPlan from "@/lib/fetch/user/getPlan";

export default async function DashboardProjectsPage() {
  const projectsData = GetProjects();
  const settingsData = PageGetSettings();
  const planData = GetUserPlan();
  const userDetailsData = GetUserDetails();

  const [projects, settings, plan, userDetails] = (await Promise.all([
    projectsData,
    settingsData,
    planData,
    userDetailsData,
  ])) as any;

  // get members for each project
  if (projects.success) {
    for (let i = 0; i < projects.data.projects.length; i++) {
      const project = projects.data.projects[i];
      const membersData = GetProject(project.id);
      const members = await membersData;

      if (members.success) {
        projects.data.projects[i].members = members.data.members;
      }
    }
  }

  return (
    <main>
      <ProjectsHeading />
      {projects.success &&
      plan.success &&
      settings.success &&
      userDetails.success ? (
        <ProjectsList
          pending_projects={projects.data.pending_projects}
          plan={plan.data.plan}
          projects={projects.data.projects}
          settings={settings.data.settings}
          user={userDetails.data.user}
        />
      ) : (
        <ErrorCard
          error={
            projects.error || plan.error || settings.error || userDetails.error
          }
          message={
            projects.message ||
            plan.message ||
            settings.message ||
            userDetails.message
          }
        />
      )}
    </main>
  );
}
