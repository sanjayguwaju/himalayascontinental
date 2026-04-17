import { Banner } from "@payloadcms/ui/elements/Banner";
import React from "react";

import "./index.scss";

const baseClass = "before-dashboard";

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to Himalayas Continental Admin</h4>
      </Banner>

      <div style={{ marginBottom: "1.5rem" }}>
        <strong>Quick Actions:</strong>
        <ul className={`${baseClass}__instructions`}>
          <li>
            <a href="/admin/collections/products" target="_blank">
              Manage Products
            </a>
            {" — Add or update medical equipment listings"}
          </li>
          <li>
            <a href="/admin/collections/posts" target="_blank">
              Manage News/Posts
            </a>
            {" — Publish company updates and articles"}
          </li>
          <li>
            <a href="/admin/collections/pages" target="_blank">
              Edit Pages
            </a>
            {" — Update homepage and other website pages"}
          </li>
          <li>
            <a href="/admin/globals/settings" target="_blank">
              Site Settings
            </a>
            {" — Update contact info, logo, and branding"}
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <strong>Useful Resources:</strong>
        <ul className={`${baseClass}__instructions`}>
          <li>
            <a href="/" target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
            {" — Preview the live site"}
          </li>
          <li>
            <a href="/admin/globals/company-info" target="_blank">
              Company Information
            </a>
            {" — Update business details"}
          </li>
          <li>
            <a href="/admin/collections/media" target="_blank">
              Media Library
            </a>
            {" — Manage product images and files"}
          </li>
        </ul>
      </div>

      <div
        style={{
          backgroundColor: "#f1f5f9",
          padding: "1rem",
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          color: "#64748b",
        }}
      >
        <strong>Tip:</strong> To add new blocks to pages, edit any page in the{" "}
        <a href="/admin/collections/pages" target="_blank">
          Pages collection
        </a>{" "}
        and use the &quot;Content&quot; tab to add sections like Product Carousel, Operation
        Theater, or Company blocks.
      </div>
    </div>
  );
};

export default BeforeDashboard;
