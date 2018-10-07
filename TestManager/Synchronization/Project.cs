using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TestManager.Models;

namespace TestManager.Synchronization
{
    public class Project
    {
        public static void Sync()
        {
            var client = new RestClient("https://gitlab.com/api/v4/");
            var requestTask = new RestRequest("groups/3749579/projects", Method.GET);
            requestTask.AddHeader("Private-Token", "FQEeuHkuUdrHbNBxQy7r");

            var cancellationToken = new CancellationToken();
            var response = client.ExecuteTaskAsync<List<ProjectGitlab>>(requestTask, cancellationToken).GetAwaiter().GetResult();

            if (response.ErrorException != null)
            {
                const string message = "Error retrieving response.  Check inner details for more info.";
                var twilioException = new ApplicationException(message, response.ErrorException);
                throw twilioException;
            }

            using (var db = new Database.TestManagerModel())
            {
                foreach(var p in response.Data)
                {
                    var project = db.Projects.Find(p.id);

                    if (project == null)
                    {
                        db.Projects.Add(new Database.Project
                        {
                            Id = p.id,
                            Name = p.name,
                            Description = p.description,
                            AvatarUrl = p.avatar_url?.ToString()
                        });
                    }
                    else
                    {
                        project.Name = p.name;
                        project.Description = p.description;
                        project.AvatarUrl = p.avatar_url?.ToString();
                    }
                }
                db.SaveChanges();
            }
        }
    }
}
