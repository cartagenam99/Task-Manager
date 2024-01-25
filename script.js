document.addEventListener("DOMContentLoaded", function () {
    // Wait for the DOM to be fully loaded

    function addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');

        if (taskInput.value.trim() !== '') {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            li.appendChild(checkbox);

            const taskText = document.createElement('span');
            taskText.textContent = taskInput.value;
            li.appendChild(taskText);

            taskList.appendChild(li);
            taskInput.value = '';

            // Attach a listener to the checkbox for task completion
            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {
                    playRandomGif(); // Function to play a random GIF
                    moveCompletedTask(li);
                } else {
                    taskText.style.textDecoration = 'none';
                }
            });
        }
    }

    function playRandomGif() {
        const numberOfGifs = 8; // Update this to the total number of your gifs
        const gifNumber = Math.floor(Math.random() * numberOfGifs) + 1;
        const gifUrl = `/assets/gif${gifNumber}.gif`;

        // Create an image element and set the source to the random GIF
        const gifImage = document.createElement('img');
        gifImage.src = gifUrl;
        gifImage.style.width = '300px'; // Adjust the size as needed
        gifImage.style.height = '300px';

        // Calculate random position values within the visible area of the window
        const maxTop = window.innerHeight - parseInt(gifImage.style.height);
        const maxLeft = window.innerWidth - parseInt(gifImage.style.width);
        const randomTop = Math.random() * maxTop;
        const randomLeft = Math.random() * maxLeft;

        // Set position values
        gifImage.style.position = 'absolute';
        gifImage.style.top = `${randomTop}px`;
        gifImage.style.left = `${randomLeft}px`;

        // Append the image to the body (you might want to customize this)
        document.body.appendChild(gifImage);

        // Set a timeout to remove the GIF after a short duration
        setTimeout(() => {
            document.body.removeChild(gifImage);
        }, 5000); // Adjust the duration in milliseconds
    }

    function moveCompletedTask(taskElement) {
        const completedTasks = document.getElementById('completedTasks');
        taskElement.removeChild(taskElement.querySelector('input'));
        taskElement.style.textDecoration = 'line-through';
        completedTasks.appendChild(taskElement);
    }

    // Attach the addTask function to the button click event
    const addButton = document.querySelector('button');
    addButton.addEventListener('click', addTask);
});
