"use client"

import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import config from '@/amplifyconfiguration.json';
import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from 'react';
import { Schema } from '@/amplify/data/resource';
import { generateClient } from 'aws-amplify/api';

Amplify.configure(config);

const client = generateClient<Schema>();

function Home() {
  const [todos, setTodos] = useState<Schema['Todo'][]>([]);

  async function listTodos() {
    const { data } = await client.models.Todo.list();
    setTodos(data);
  }

  useEffect(() => {
    listTodos();
  }, []);

  useEffect(() => {
    const sub = client.models.Todo.observeQuery()
      .subscribe(({ items }) => setTodos([...items]))
  
    return () => sub.unsubscribe()
  }, []);

  return (
    <main>
      <h1>Hello, Amplify 👋</h1>
      <button onClick={async () => {
        // create a new Todo with the following attributes
        const { errors, data: newTodo } = await client.models.Todo.create({
          // prompt the user to enter the title
          content: window.prompt("title"),
          done: false,
          priority: 'medium'
        })
        console.log(errors, newTodo);
      }}>Create </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </main>
  );
}

export default withAuthenticator(Home);