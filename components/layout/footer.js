import Link from 'next/link'

import classes from './footer.module.css'

export default function Footer() {
    return <footer className={classes.footer}>
        <h3 className={classes.title}>Powered by <Link href="/"><a className={classes.link}>Waiter.so</a></Link></h3>
        {/* <p className={classes.slogan}>Commandez en ligne. Dégustez sur place.</p> */}
    </footer>
}