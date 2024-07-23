//@ts-check
const core = require("@actions/core");
const github = require("@actions/github");

try {
  // `who-to-greet` input defined in action metadata file
  const courseId = core.getInput("courseId");
  const sectionId = core.getInput("sectionId");
  const testResult = core.getInput("testResult");

  const results = JSON.parse(
    Buffer.from(testResult, "base64").toString("utf-8")
  );
  const payload = {
    body: results,
    source: "github-classroom",
    courseId,
    sectionId,
    userId: github.context.actor,
    repository: github.context.repo,
    sha: github.context.sha,
  };
  console.log("Reporting test results to 🧪🍰 SkillPies ");
  console.log(JSON.stringify(payload, null, 2));

  fetch("https://www.skillpies.com/api/test-report", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      const result = data.json();

      if (data.status !== 201) {
        console.log("❌ Error in Reporting");
        result.then((json) => {
          core.setFailed(JSON.stringify(json));
        });
      } else {
        console.log("🏁 Errors Reported");
      }
    })
    .catch((e) => {
      throw e;
    });
} catch (error) {
  core.setFailed(error.message);
}
