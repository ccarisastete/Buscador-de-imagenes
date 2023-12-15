import { useState } from "react";
import { Formik, Form, Field } from "formik";
import './Header.css'
import './Content.css'
import './Article.css'

const App = () => {
  const [photos, setPhotos] = useState([])
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=40&query=${values.search}`,
              {
                headers: {
                  'Authorization': 'Client-ID 6rE_F7_OmgNfAatxgXLZh_sBQX8fnSfYwBY5jcfq-Uo'
                }
              })
            const data = await response.json()
            setPhotos(data.results)
            console.log(photos)
          }}>
          <Form>
            <Field name='search' placeholder='Search' />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo =>
            <article key={photo.id} onClick={() => window.open(photo.links.html)}>
              <img src={photo.urls.regular} />
              {photo.description != null && photo.description.length < 8
                ? <p>{photo.description}</p>
                : <p>{photo.alt_description}</p>}
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
