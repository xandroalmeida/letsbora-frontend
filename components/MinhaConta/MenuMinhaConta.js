import Link from 'next/link';

function MenuMinhaConta(props) {
   return (
      <div className="actions-panel">
         <Link href="/cliente/dados-pessoais">
            <a className={`btn-action ${props.page === 'dados' ? 'active' : ''}`}>
               Dados Pessoais
            </a>
         </Link>
         <Link href="/cliente/informacoes-pagamento">
            <a className={`btn-action ${props.page === 'pagamento' ? 'active' : ''}`}>
               Informações de Pagamentos
            </a>
         </Link>
         <Link href="/cliente/meus-pedidos">
            <a className={`btn-action ${props.page === 'pedidos' ? 'active' : ''}`}>
               Meus Pedidos
            </a>
         </Link>
      </div>
   );
}

export default MenuMinhaConta;