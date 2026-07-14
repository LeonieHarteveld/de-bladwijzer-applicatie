import styles from './MyLoans.module.scss'
import PageLayout from "../../components/PageLayout/PageLayout.jsx";
import LoanCard from "../../components/LoanCard/LoanCard.jsx";

function MyLoans() {

    return (
        <PageLayout
            title="Mijn leningen"
            subtitle="Een overzicht van jouw huidige leningen"
        >
            <LoanCard />
        </PageLayout>
    )
}

export default MyLoans