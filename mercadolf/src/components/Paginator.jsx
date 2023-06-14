
function Paginator({ pagePro, pageTotal, total }) {

  return (
    <>

      <center>
        <nav aria-label="Page navigation example">
          <ul class="inline-flex -space-x-px">
            {
              Math.floor(pagePro) + 1 > 1 ?
                <li>
                  <a href={`/home/page/${Math.floor(pagePro) - 1}`} aria-current="page" class="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">&laquo;</a>
                </li>
                : <></>
            }
            {
              Math.floor(pagePro) !== 0 ?
                <li>
                  <a href={`/home/page/0`} class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Primera</a>

                </li>
                : <></>
            }

            {pageTotal.map((pag, i) =>
              <li key={i}> {
                pag - 1 === Math.floor(pagePro) ?
                  <>
                    <span class="px-3 py-2 leading-tight text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" >{pag}</span>
                  </>
                  :
                  <>
                    <a href={`/home/page/${pag - 1}`} class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{pag}</a>
                  </>
              }  </li>
            )
            }
            {

              Math.floor(pagePro) + 1 < total - 1 ?
                <li>
                  <a href={`/home/page/${total - 1}`} class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Última</a>
                </li>
                : <></>
            }

            {
              Math.floor(pagePro) + 1 < pageTotal[pageTotal.length - 1] ?
                <li>
                  <a href={`/home/page/${Math.floor(pagePro) + 1}`} aria-current="page" class="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">&raquo;</a>
                </li>
                : <></>
            }

          </ul>
        </nav>
      </center>


      {
        /*
        <ul >
        {
          Math.floor(pagePro) + 1 > 1 ?
            <li>
              <a href={`/home/page/${Math.floor(pagePro) - 1}`}>&laquo;</a>
            </li>
            : <></>
        }
        {
          Math.floor(pagePro) !== 0 ?
            <li>
              <a href={`/home/page/0`}>Primera</a>
            </li>
            : <></>
        }

        {pageTotal.map((pag, i) =>
          <li key={i}> {
            pag - 1 === Math.floor(pagePro) ?
              <>
                <span  >{pag}</span>
              </>
              :
              <>
                <a href={`/home/page/${pag - 1}`}>{pag}</a>
              </>
          }  </li>
        )
        }
        {

          Math.floor(pagePro) + 1 < total - 1 ?
            <li>
              <a href={`/home/page/${total - 1}`}>Última</a>
            </li>
            : <></>
        }

        {
          Math.floor(pagePro) + 1 < pageTotal[pageTotal.length - 1] ?
            <li>
              <a href={`/home/page/${Math.floor(pagePro) + 1}`}>&raquo;</a>
            </li>
            : <></>
        }
      </ul>
      
        */
      }
    </>
  );
}

export default Paginator;