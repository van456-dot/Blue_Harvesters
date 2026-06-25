import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useRef } from "react";
import Footer from "../components/Footer";
import html2pdf from "html2pdf.js";

function Result() {
  const location = useLocation();
  const result = location.state;
  const contentRef = useRef(null);
  
  // Conditional variables
  const isFeasible = result.feasible;
  const rainwater = parseInt(result.rainwaterCollected);
  const waterDemand = parseInt(result.waterDemand);
  const surplus = rainwater - waterDemand;
  
  // Map recommended structure to image asset
  const getStructureImage = () => {
    const structure = result.recommendedStructure.toLowerCase() || '';
    if (structure.includes('tank') || structure.includes('storage')) {
      return '/images/icn-stg-tank.png'; // Storage tank image
    } else if (structure.includes('trench') || structure.includes('drain')) {
      return '/images/icn-rechg-trench.png'; // Trench/French drain image
    } else if (structure.includes('pit')) {
      return '/images/icn-rechg-pit.png'; // Pit/bore well image
    }
    return '/images/icn-stg-tank.png'; // Default to storage tank
  };

  const handleDownload = () => {
    const element = contentRef.current;
    const opt = {
      margin: 10,
      filename: 'rainwater_harvesting_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true }
    };
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="resultContainer">
      <div className="resultPage" ref={contentRef}>

        <h2>Here are your rainwater harvesting results</h2>
        <p>We've analyzed your inputs to help you make the best decision</p>

        <div className={`box ${isFeasible ? 'feasible' : 'infeasible'}`}>
          <div className="houseImg"><img src="/images/houseImg.png" alt="" width={200} /></div>
          <div className="midContent">

            <h4 className={isFeasible ? 'success' : 'error'}>
              <img src={isFeasible ? '/images/check-mark.png' : '/images/cross-mark.png'} alt={isFeasible ? 'success' : 'error'} />
              {isFeasible ? 'Great News!' : 'Uh oh!'}
            </h4>
            <p> {isFeasible ? 'Your rooftop has the potential to harvest' : "Your rooftop doesn't have the potential to harvest rainwater."}</p>
           <h2 className={isFeasible ? 'success' : 'error'}>{parseInt(result.rainwaterCollected)}L</h2>
            <p> {isFeasible ? 'litres of rainwater every year' : 'Consider site improvements or water conservation measures.'}</p>
          </div>

          {isFeasible ? (
            <ul>
              <h4>You can use this water for:</h4>

              <li> <img src="/images/leaves-of-a-plant.png" alt="" />Gardening & Landscaping</li>
              <li> <img src="/images/toilet.png" alt="" />Flushing Toilets</li>
              <li> <img src="/images/wash.png" alt="" />Cleaning & Washing</li>
              <li> <img src="/images/mop.png" alt="" />General Non-Potable Use</li>
            </ul>
          ) : (
            <ul>
              <h4>How to improve your rainwater harvesting potential:</h4>

              <li>  Increase your roof catchment area</li>
              <li>  Ensure proper roof slope and drainage</li>
              <li>  Regular cleaning and maintenance</li>
              <li>  Install adequate storage capacity</li>
            </ul>
          )}

        </div>

        <div className="grid1">
          <div className="grid-item">
            <img src="/images/icn-drop.png" alt="" />
            <div className="itemContent">
              <p>Annual Rainwater Collected</p>
              <h3>{parseInt(result.rainwaterCollected)} L</h3>
              <p>({(result.rainwaterCollected / 100).toFixed(2)}KL)</p>
            </div>
          </div>

          <div className="grid-item">
            <img src="/images/icn-piggy.png" alt=""/>
            <div className="itemContent">
              <p>Annual Savings</p>
              <h3>{result.annualSavings} </h3>
              <p>On water bills</p>
            </div>
          </div>

          <div className="grid-item">
            <img src="/images/icn-wallet.png" alt="" />
            <div className="itemContent">
              <p>Total System Cost</p>
              <h3>{result.cost} </h3>
              <p>Estimated Cost</p>
            </div>
          </div>

          <div className="grid-item">
            <img src="/images/icn-payback.png" alt="" />
            <div className="itemContent">
              <p>Payback Period</p>
              <h3>{result.paybackPeriod}</h3>
              <p>To recover your investment</p>
            </div>
          </div>

        </div>

        <div className="grid2">
          <div className="grid-item">
            <h6>Water Balance(Annual)</h6>
            <ul>
              <li><p>Rainwater Collected</p> <h6>{parseInt(result.rainwaterCollected)}L</h6></li>
              <li><p>Your Water Demand</p> <h6>{parseInt(result.waterDemand)}L</h6></li>
              <li><p>Surplus</p> <h6>{(parseInt(result.rainwaterCollected)) - (parseInt(result.waterDemand))}L</h6> </li>
            </ul>
          </div>

          <div className="grid-item">
            <h6>Feasibility</h6>
            {isFeasible ? <img src="/images/icn-feasible.png" alt="" /> : <img src="/images/icn-notFeasible.png" alt="" />} 
            <p>{result.feasible ? "Your location and roof are suitable for rainwater harvesting" : "Your roof is not suitable for rainwater harvesting"}</p>
          </div>

          <div className="grid-item">
            <h6>Recommended System</h6>
            {isFeasible && <img src={getStructureImage()} alt={result.recommendedStructure} />}
            <p>{isFeasible ? result.recommendedStructure : 'No recommended system available'}</p>
            <p>{isFeasible ? 'This system is ideal for your requirements and location' : 'Improve site conditions to enable rainwater harvesting'}</p>
          </div>

        </div>

        <div className="locationBox">

          <div className="locationContent">
            <h6> <img src="/images/svg-pin.svg" alt=""/> Your Location</h6>
            <p>Latitude: {result.location.latitude}</p>
            <p>Longitude: {result.location.longitude}</p>
          </div>

          <div className="tipContent">
            <h6><img src="/images/icn-tip-drop.png" alt="" />Pro Tip</h6>
            <p>Maintain your system regularly and clean your filters to ensure maximum efficiency and long-term savings.</p>
          </div>

        </div>
      </div>

      <div className="result-actions">
        <button className="btn-primary" onClick={handleDownload}> <img src="/images/svg-download.svg" alt="" width={20} /> Download Report</button>
        <Link to="/" className="btn-secondary"> <img src="/images/svg-return.svg" alt="" width={15} /> Recalculate</Link>
      </div>
    </div>
  );
}
export default Result;