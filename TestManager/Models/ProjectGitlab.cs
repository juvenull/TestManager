using System;
using System.Collections.Generic;

namespace TestManager.Models
{
    public class ProjectGitlab
    {
        public int id { get; set; }
        public string description { get; set; }
        public string default_branch { get; set; }
        public List<object> tag_list { get; set; }
        public string ssh_url_to_repo { get; set; }
        public string http_url_to_repo { get; set; }
        public string web_url { get; set; }
        public string name { get; set; }
        public string name_with_namespace { get; set; }
        public string path { get; set; }
        public string path_with_namespace { get; set; }
        public object avatar_url { get; set; }
        public int star_count { get; set; }
        public int forks_count { get; set; }
        public DateTime created_at { get; set; }
        public DateTime last_activity_at { get; set; }
        //public Links _links { get; set; }
        public bool archived { get; set; }
        public string visibility { get; set; }
        public bool resolve_outdated_diff_discussions { get; set; }
        public bool container_registry_enabled { get; set; }
        public bool issues_enabled { get; set; }
        public bool merge_requests_enabled { get; set; }
        public bool wiki_enabled { get; set; }
        public bool jobs_enabled { get; set; }
        public bool snippets_enabled { get; set; }
        public bool shared_runners_enabled { get; set; }
        public bool lfs_enabled { get; set; }
        public int creator_id { get; set; }
        //public Namespace @namespace { get; set; }
        public string import_status { get; set; }
        public int open_issues_count { get; set; }
        public bool public_jobs { get; set; }
        public object ci_config_path { get; set; }
        public List<object> shared_with_groups { get; set; }
        public bool only_allow_merge_if_pipeline_succeeds { get; set; }
        public bool request_access_enabled { get; set; }
        public bool only_allow_merge_if_all_discussions_are_resolved { get; set; }
        public bool printing_merge_request_link_enabled { get; set; }

    }
}
