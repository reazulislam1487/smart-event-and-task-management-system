export const createTask = async (req, res, taskModel) => {
  const { title, description, status, priority, due_date, user_id } = req.body;
  try {
    const task = await taskModel.create(
      title,
      description,
      status,
      priority,
      due_date,
      user_id
    );
    res.status(201).json({
      message: "task create successfully",
      success: true,
      data: task,
    });
  } catch (err) {
    res.send("error from create post route",err);
  }
};
