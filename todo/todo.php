<?php
// define the file path for the tasks file
$file = 'tasks.json';

// function to get the tasks from the file
function getTasks() {
  global $file;
  if (file_exists($file)) {
    $data = file_get_contents($file);
    return json_decode($data, true);
  } else {
    return [];
  }
}

// function to save the tasks to the file
function saveTasks($tasks) {
  global $file;
  $data = json_encode($tasks);
  file_put_contents($file, $data);
}

// function to add a new task to the list
function addTask($name) {
  $tasks = getTasks();
  $id = time();
  $task = array('id' => $id, 'name' => $name, 'completed' => false);
  $tasks[] = $task;
  saveTasks($tasks);
}

// function to delete a task from the list
function deleteTask($id) {
  $tasks = getTasks();
  foreach ($tasks as $key => $task) {
    if ($task['id'] == $id) {
      unset($tasks[$key]);
      break;
    }
  }
  saveTasks($tasks);
}

// function to mark a task as completed or pending
function markTask($id, $completed) {
  $tasks = getTasks();
  foreach ($tasks as &$task) {
    if ($task['id'] == $id) {
      $task['completed'] = $completed;
      break;
    }
  }
  saveTasks($tasks);
}

// check if the action parameter is set
if (isset($_POST['action'])) {
  if ($_POST['action'] == 'add') {
    // add a new task to the list
    $name = $_POST['name'];
    addTask($name);
  } elseif ($_POST['action'] == 'delete') {
    // delete a task from the list
    $id = $_POST['id'];
    deleteTask($id);
  } elseif ($_POST['action'] == 'mark') {
    // mark a task as completed or pending
    $id = $_POST['id'];
    $completed = ($_POST['completed'] == 'true');
    markTask($id, $completed);
  }

  // return the updated list of tasks
  echo json_encode(getTasks());
} elseif (isset($_GET['action']) && $_GET['action'] == 'get') {
  // return the current list of tasks
  echo json_encode(getTasks());
}

?>
