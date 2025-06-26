---
title: "Most useful command of Git"
subtitle: "Git Command that most developer must know about"
date: "2024-03-26"
---

Git has revolutionized the way developers collaborate and manage their codebases. From tracking changes to facilitating teamwork, Git offers a plethora of commands and functionalities to streamline the development process. In this guide, we'll explore essential Git commands and their functionalities to empower you in mastering version control.


# Basic Operations

1. `git init`: Initialize a new Git repository in the current directory.

2. `git clone <repository>`: Clone an existing repository to your local machine.

3. `git add <file>`: Stage changes in a specific file for the next commit.
   - `git add .`: Stage all changes in the current directory.

4. `git commit -m "message"`: Commit staged changes with a descriptive message.

5. `git status`: Show the current status of the repository, including staged and unstaged changes.

6. `git log`: Display the commit history.
   - `git log --oneline`: Display the commit history in a compact format.

7. `git diff`: Show differences between the working directory and the staging area or the last commit.
   - `git diff --staged`: Show differences between the staging area and the last commit.

# Branching and Merging

8. `git branch`: List all branches in the repository.
   - `git branch <branch-name>`: Create a new branch.
   - `git branch -d <branch-name>`: Delete a branch.

9. `git checkout <branch-name>`: Switch to a different branch.
   - `git checkout -b <branch-name>`: Create a new branch and switch to it.

10. `git merge <branch-name>`: Merge changes from a branch into the current branch.

11. `git pull`: Fetch changes from a remote repository and merge them into the current branch.

12. `git push`: Push local commits to a remote repository.
    - `git push -u <remote> <branch>`: Push the current branch to a remote repository and set the upstream.

# Advanced Operations

13. `git fetch`: Fetch changes from a remote repository without merging them.

14. `git stash`: Temporarily save uncommitted changes.
    - `git stash apply`: Apply the most recently stashed changes.

15. `git remote`: List remote repositories.
    - `git remote add <name> <url>`: Add a new remote repository.

16. `git revert <commit>`: Create a new commit that undoes the changes made in a specific commit, effectively reverting the repository to a previous state.

17. `git reset`: Reset the repository to a specific state.
    - `git reset --soft <commit>`: Move the branch pointer to the specified commit, keeping changes in the staging area.
    - `git reset --mixed <commit>`: Move the branch pointer to the specified commit, unstaging changes but keeping them in the working directory.
    - `git reset --hard <commit>`: Move the branch pointer to the specified commit, discarding all changes since that commit.

18. `git cherry-pick <commit>`: Apply the changes introduced by a specific commit to the current branch.

19. `git rebase`: Reapply commits on top of another base branch.
    - `git rebase <branch>`: Rebase the current branch onto the specified branch.
    - `git rebase -i <commit>`: Interactively rebase commits, allowing for squashing, reordering, or editing.

20. `git tag`: Create, list, or delete tags for specific commits.
    - `git tag <tag-name>`: Create a lightweight tag.
    - `git tag -a <tag-name> -m "message"`: Create an annotated tag with a message.
    - `git push --tags`: Push tags to a remote repository.

21. `git blame <file>`: Show who last modified each line of a file and when.

22. `git show <commit>`: Display the details of a specific commit, including the changes made.

23. `git config`: Configure Git settings.
    - `git config --global user.name "Your Name"`: Set your name globally.
    - `git config --global user.email "your@email.com"`: Set your email globally.
    - `git config --global core.editor "vim"`: Set the default text editor.

24. `git remote`: Manage remote repositories.
    - `git remote -v`: List remote repositories with their URLs.
    - `git remote remove <remote>`: Remove a remote repository.

25. `git submodule`: Manage submodules within a repository.
    - `git submodule add <repository> <path>`: Add a submodule to the repository.
    - `git submodule update --init --recursive`: Initialize and update submodules recursively.

26. `git reflog`: Display a log of all reference updates (branches, tags, etc.) in the repository.

27. `git bisect`: Use binary search to find the commit that introduced a bug.
    - `git bisect start`: Start the bisect process.
    - `git bisect good <commit>`: Mark a commit as good.
    - `git bisect bad <commit>`: Mark a commit as bad.


https://medium.com/@bikash_jaiswal/title-git-command-that-all-developer-must-know-4f3c83171773?sk=f58d9d423279efb635df4af64a19e237