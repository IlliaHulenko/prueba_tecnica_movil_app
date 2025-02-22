import  ProductList from '../components/ProductList'

const HomePage = () => {
  
  return (
    <main className="main-wrapper">
      <div className="main-container">
        <h1>Productos:</h1>
        <div>
          <ProductList />
        </div>
      </div>      
    </main>
  )
}

export default HomePage