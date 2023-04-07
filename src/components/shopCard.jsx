export default function ShopCard({factory, buy, colorBottom = "#808080"}) {
    let imgSrc
    if (colorBottom === "#1faee9") {
        imgSrc = "https://cdn.icon-icons.com/icons2/1383/PNG/512/coin_94963.png"
    } else if (colorBottom === "#00a550") {
        imgSrc = "https://cdn.icon-icons.com/icons2/1508/PNG/512/emeraldthememanagericon_104628.png"
    } else {
        imgSrc = "https://cdn.icon-icons.com/icons2/1383/PNG/512/coin_94963.png"
    }
    return (
        <div className="card" style={{borderBottom: "3px solid" + colorBottom}}>
            <h2 style={{color: factory.color}}>{factory.name}</h2>
            <p>{factory.description}</p>
            <h3 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Cost: {factory.cost} <img style={{marginLeft: "10px"}} width="32px" src={imgSrc} alt=""/></h3>
            <h4>You have: {factory.quantity}</h4>
            <button onClick={() => buy(factory.cost, colorBottom)}>Buy</button>
        </div>
    )
}