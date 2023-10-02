# ALWAYS DO THIS BEFORE CHANGES OR NEW BRANCH

Before making changes (which would put you behind main) you will want to do the following to update your local files.

```bash
$ git pull origin main
```

- [Rebase GitHub Docs](https://docs.github.com/en/get-started/using-git/about-git-rebase)

If you are behind 'main' due to changes, but you are inside of a branch for a bug fix and a bunch of changes to main occur. When trying to merge, you no longer have the ability.

Rebase Main INTO repo, which gives you ALL the changes to your local repo to see what would need to be modified which would allow you to merge.
- NOTE: rebase will delete commit messages

```bash
# commits between another branch and the current branch state
git rebase --interactive OTHER-BRANCH-NAME
```

## GitHub | Create New Branch & Pull Request

1. After cloning the repo, create a new branch (e.g., create-card-component) to beging making changes::

```bash
# Create a new brach
$ git checkout -b create-card-component
```

2. Before creating your pull request (git push):

```bash
# Check the branch you are on is intended brach
$ git status

# See the differences made
$ git diff
```

3. Add and Commit the new changes to repo

```bash
$ git add <filename>

$ git commit -m "message about changes~additions to file(s)"
```

4. Push to repository (using the branch you created)

```bash
git push origin create-card-component
```

5. From your GitHub repository, submit a pull request:

- Add title, message, and assign reviewers for the pull request

## Delete Pull Request After Merged

Once the changes are accepted and merged, you will want to delete your local branch.

Also, delete that branch from GitHub ()

```bash
# In your terminal
$ git branch -d create-card-component
```
