#!/bin/sh
tmux new-session -s hurricane -n 'Hurricane' -d

# send 'tail -f foo<enter>' to the first pane.
# I adress the first pane using the -t flag. This is not necessary,
# I'm doing it so explicitly to show you how to do it.
# for the <enter> key, we can use either C-m (linefeed) or C-j (newline)

tmux send-keys -t hurricane:myWindow.0 'npm start ' C-j

# split the window *vertically*
tmux split-window -v

#proxy
tmux send-keys -t 1 'node proxy.js' C-j

tmux split-window -h

# python api
tmux select-window -t hurricane:myWindow.2
tmux send-keys -t hurricane:myWindow.2 'cd api' C-j
tmux send-keys -t hurricane:myWindow.2 'source venv/bin/activate' C-j
tmux send-keys -t hurricane:myWindow.2 'export APP_SETTINGS="development"' C-j
tmux send-keys -t hurricane:myWindow.2 'export DATABASE_URL="postgresql://postgres:postgres@localhost/hurricane"' C-j
tmux send-keys -t hurricane:myWindow.2 'python run.py' C-j

# finally attach to the session
tmux attach -t hurricane
