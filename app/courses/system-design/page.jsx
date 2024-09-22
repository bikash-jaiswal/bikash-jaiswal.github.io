"use client"
import React from "react";
import { CheckSquare, Square, ChevronDown, ChevronRight } from "lucide-react";

const SystemDesignRoadmap = () => {
  const [expandSection, setExpandSection] = React.useState({});

  const toggleSection = (section) => {
    setExpandSection((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const sections = [
    {
      title: "1. Low-Level Design (LLD)",
      items: [
        {
          label: "Object-Oriented Programming",
          subItems: [
            "Classes, Objects, Encapsulation, Inheritance, Abstraction, Polymorphism",
            "Operator overloading, Association, Aggregation, Composition",
          ],
        },
        {
          label: "UML Diagrams",
          subItems: [
            "Class Diagrams",
            "Object Diagrams",
            "Activity Diagrams",
            "Sequence Diagrams",
            "State Diagrams",
          ],
        },
        {
          label: "Design Principles",
          subItems: [
            "SOLID Principles",
            "DRY and KISS Principles",
            "GRASP Principles",
          ],
        },
        {
          label: "Design Patterns",
          subItems: [
            "Creational: Singleton, Factory, Abstract Factory",
            "Structural: Adapter, Bridge, Composite, Proxy",
            "Behavioral: Observer, Strategy, Command, Iterator, Template Method",
          ],
        },
      ],
    },
    {
      title: "2. High-Level Design (HLD) Basics",
      items: [
        { label: "Client-Server Architecture" },
        { label: "Network Protocols (TCP/IP, HTTP/HTTPS, WebSocket)" },
        { label: "API Design (REST, GraphQL, gRPC)" },
        { label: "Microservices Architecture" },
      ],
    },
    {
      title: "3. System Components",
      items: [
        {
          label: "Domain Name System (DNS)",
          subItems: [
            "Request Routing",
            "DNS Caching",
            "Route53 (AWS-specific)",
          ],
        },
        {
          label: "Load Balancers",
          subItems: [
            "Types of Load Balancers",
            "Load Balancing Algorithms",
            "Scaling Load Balancers",
          ],
        },
        {
          label: "Caching",
          subItems: [
            "Cache Types (Browser, CDN, Application, Database)",
            "Caching Strategies",
            "Cache Invalidation",
            "Cache Eviction Policies",
          ],
        },
        { label: "Content Delivery Networks (CDN)" },
      ],
    },
    {
      title: "4. Databases",
      items: [
        {
          label: "Database Types",
          subItems: [
            "Relational Databases",
            "NoSQL Databases (Document, Key-Value, Column-family, Graph)",
            "NewSQL Databases",
          ],
        },
        {
          label: "Database Concepts",
          subItems: [
            "ACID Properties",
            "CAP Theorem",
            "Database Indexing (B-Tree, B+ Tree)",
            "Transactions and Isolation Levels",
          ],
        },
        {
          label: "Database Scaling",
          subItems: [
            "Database Replication (Master-Slave, Multi-Leader, Leaderless)",
            "Database Sharding",
            "Consistent Hashing",
          ],
        },
      ],
    },
    {
      title: "5. Distributed Systems",
      items: [
        { label: "Consistency Models" },
        { label: "Consensus Algorithms (Paxos, Raft)" },
        { label: "Gossip Protocol" },
        { label: "Leader Election" },
        { label: "Distributed Transactions" },
        { label: "Partition Tolerance" },
      ],
    },
    {
      title: "6. Messaging Systems",
      items: [
        { label: "Message Queues" },
        { label: "Publish-Subscribe Model" },
        { label: "Apache Kafka" },
        { label: "RabbitMQ" },
      ],
    },
    {
      title: "7. Security and Authentication",
      items: [
        { label: "Encryption (Symmetric and Asymmetric)" },
        { label: "Hashing and Salting" },
        { label: "OAuth and OpenID Connect" },
        { label: "JSON Web Tokens (JWT)" },
        { label: "SSL/TLS" },
      ],
    },
    {
      title: "8. System Design Patterns",
      items: [
        { label: "Circuit Breaker Pattern" },
        { label: "Bulkhead Pattern" },
        { label: "Sidecar Pattern" },
        { label: "CQRS (Command Query Responsibility Segregation)" },
        { label: "Event Sourcing" },
        { label: "Saga Pattern" },
      ],
    },
    {
      title: "9. Performance and Scalability",
      items: [
        { label: "Vertical Scaling" },
        { label: "Horizontal Scaling" },
        { label: "Performance Metrics (Latency, Throughput, Availability)" },
        { label: "Load Testing and Stress Testing" },
        { label: "Rate Limiting and Throttling" },
      ],
    },
    {
      title: "10. Monitoring and Logging",
      items: [
        { label: "Monitoring Tools and Techniques" },
        { label: "Logging and Log Aggregation" },
        { label: "Alerting Systems" },
        { label: "Metrics and KPIs" },
      ],
    },
    {
      title: "11. Design and Development Methodologies",
      items: [
        { label: "Agile Methodologies" },
        { label: "DevOps Practices" },
        { label: "CI/CD Pipelines" },
        { label: "Test-Driven Development (TDD)" },
      ],
    },
    {
      title: "12. Cloud Computing",
      items: [
        { label: "Cloud Service Models (IaaS, PaaS, SaaS)" },
        { label: "Deployment Models (Public, Private, Hybrid)" },
        { label: "Serverless Computing" },
        { label: "Cloud Storage Solutions" },
      ],
    },
    {
      title: "13. Infrastructure as Code (IaC)",
      items: [
        { label: "Terraform" },
        { label: "AWS CloudFormation" },
        { label: "Ansible" },
        { label: "Chef and Puppet" },
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 bg-dark shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">System Design Interview Roadmap</h1>
      <p className="text-center mb-8">
        This roadmap is tailored for senior engineer interviews at Meta, Google, Coinbase, and Amazon.
      </p>

      {sections.map((section, index) => (
        <div key={index} className="mb-4 border border-gray-200 rounded-lg">
          <div
            className="flex justify-between items-center p-4 cursor-pointer bg-dark hover:bg-gray-700"
            onClick={() => toggleSection(section.title)}
          >
            <h2 className="text-xl font-semibold">{section.title}</h2>
            {expandSection[section.title] ? <ChevronDown /> : <ChevronRight />}
          </div>

          {expandSection[section.title] && (
            <ul className="pl-6 pt-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="hidden" />
                    <CheckSquare className="text-gray-200" />
                    <span className="text-lg">{item.label}</span>
                  </label>

                  {item.subItems && (
                    <ul className="pl-6 mt-2 space-y-1">
                      {item.subItems.map((subItem, subItemIndex) => (
                        <li key={subItemIndex} className="flex items-center space-x-2">
                          <Square className="text-gray-900" />
                          <span>{subItem}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default SystemDesignRoadmap;
