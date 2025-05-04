import { Component } from "react";

class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.props.item.done}
          onChange={() => this.props.toggle(this.props.item)}
        />
        <span>{this.props.item.name}</span>
      </div>
    );
  }
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(event) {
    if (event.key === "Enter" && this.state.value !== "") {
      this.props.submit(this.state.value);
      this.setState({ value: "" });
    }
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <input
        type="text"
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        placeholder={this.props.placeholder}
        value={this.state.value}
      />
    );
  }
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(reqItem) {
    this.setState((prev) => {
      const index = prev.items.findIndex((item) => {
        return item.id === reqItem.id;
      });

      prev.items[index].done = !prev.items[index].done;
      return prev;
    });
  }

  submit(item) {
    this.setState((prev) => {
      prev.items.push({ name: item, id: Date.now(), done: false });
      return prev;
    });
  }

  render() {
    const items = this.state.items.map((item) => {
      return <ListItem key={item.id} item={item} toggle={this.toggle} />;
    });
    return (
      <>
        <Input submit={this.submit} placeholder="enter item" />
        {...items}
      </>
    );
  }
}

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
    this.submit = this.submit.bind(this);
  }

  submit(task) {
    this.setState((prev) => {
      prev.tasks.push({ name: task, id: Date.now() });
      return prev;
    });
  }

  render() {
    const tasks = this.state.tasks.map((task) => {
      return (
        <div
          style={{
            backgroundColor: "grey",
            height: "fit-content",
            width: "500px",
          }}
          key={task.id}
        >
          <p>{task.name}</p>
          <List items={task.items} />
        </div>
      );
    });

    return (
      <>
        <Input submit={this.submit} placeholder="enter task" />
        {...tasks}
      </>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Tasks />;
  }
}

export default App;
