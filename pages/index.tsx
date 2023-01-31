import React from "react";

const Home: React.FC = () => {
  return (
    <main className="container">
      <section id="typography">
        <h2>Typography</h2>
        <p>
          Aliquam lobortis vitae nibh nec rhoncus. Morbi mattis neque eget
          efficitur feugiat. Vivamus porta nunc a erat mattis, mattis feugiat
          turpis pretium. Quisque sed tristique felis.
        </p>

        <blockquote>
          "Maecenas vehicula metus tellus, vitae congue turpis hendrerit non.
          Nam at dui sit amet ipsum cursus ornare."
          <footer>
            <cite>- Phasellus eget lacinia</cite>
          </footer>
        </blockquote>

        <h3>Lists</h3>
        <ul>
          <li>Aliquam lobortis lacus eu libero ornare facilisis.</li>
          <li>Nam et magna at libero scelerisque egestas.</li>
          <li>Suspendisse id nisl ut leo finibus vehicula quis eu ex.</li>
          <li>Proin ultricies turpis et volutpat vehicula.</li>
        </ul>

        <h3>Inline text elements</h3>
        <figure>
          <table>
            <tbody>
              <tr>
                <td>
                  <a href="#">Link</a>
                </td>
                <td>
                  <strong>Bold</strong>
                </td>
                <td>
                  <em>Italic</em>
                </td>
              </tr>
              <tr>
                <td>
                  <u>Underline</u>
                </td>
                <td>
                  <del>Deleted</del>
                </td>
                <td>
                  <ins>Inserted</ins>
                </td>
              </tr>
              <tr>
                <td>
                  <s>Strikethrough</s>
                </td>
                <td>
                  <small>Small </small>
                </td>
                <td>
                  <abbr title="Abbreviation" data-tooltip="Abbreviation">
                    Abbr.
                  </abbr>
                </td>
              </tr>
              <tr>
                <td>
                  Text <sub>Sub</sub>
                </td>
                <td>
                  Text <sup>Sup</sup>
                </td>
                <td>
                  <kbd>Kbd</kbd>
                </td>
              </tr>
              <tr>
                <td>
                  <mark>Highlighted</mark>
                </td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </figure>

        <h3>Heading 3</h3>
        <p>
          Integer bibendum malesuada libero vel eleifend. Fusce iaculis turpis
          ipsum, at efficitur sem scelerisque vel. Aliquam auctor diam ut purus
          cursus fringilla. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos.
        </p>
        <h4>Heading 4</h4>
        <p>
          Cras fermentum velit vitae auctor aliquet. Nunc non congue urna, at
          blandit nibh. Donec ac fermentum felis. Vivamus tincidunt arcu ut
          lacus hendrerit, eget mattis dui finibus.
        </p>
        <h5>Heading 5</h5>
        <p>
          Donec nec egestas nulla. Sed varius placerat felis eu suscipit. Mauris
          maximus ante in consequat luctus. Morbi euismod sagittis efficitur.
          Aenean non eros orci. Vivamus ut diam sem.
        </p>
        <h6>Heading 6</h6>
        <p>
          Ut sed quam non mauris placerat consequat vitae id risus. Vestibulum
          tincidunt nulla ut tortor posuere, vitae malesuada tortor molestie.
          Sed nec interdum dolor. Vestibulum id auctor nisi, a efficitur sem.
          Aliquam sollicitudin efficitur turpis, sollicitudin hendrerit ligula
          semper id. Nunc risus felis, egestas eu tristique eget, convallis in
          velit.
        </p>
      </section>
    </main>
  );
};

export default Home;
