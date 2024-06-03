import {
  Form,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/app.css?url";
import { createEmptyContact, getContacts } from "./data";
import { json } from "@remix-run/node";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const action=async()=>{
  const contact=await createEmptyContact()
  return json({contact})
}



//fetching data 
export const loader =async()=>{
  const contacts = await getContacts();
  return json(contacts)
}

export default function App() {
  const navigation=useNavigation()

const isSubmitting=!(navigation.state==='idle')
  const contacts=useLoaderData<typeof loader>()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
            </Form>
            <Form method="post">
              <button type="submit">{isSubmitting ? "Creating...":"New"}</button>
            </Form>
          </div>
          <nav>
          {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <NavLink 
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                    
                    to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite ? (
                        <span>★</span>
                      ) : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
            <ul>
              <li>
                <a href={`/contacts/1`}>Your Name</a>
              </li>
              <li>
                <a href={`/contacts/2`}>Your Friend</a>
              </li>
            </ul>
          </nav>
        </div>
        <div  className={
            navigation.state === "loading" ? "loading" : ""
          }
          id="detail">
          <Outlet/>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
