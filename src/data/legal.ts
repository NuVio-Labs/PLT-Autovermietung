/**
 * Rechtstexte – 1:1 vom bestehenden Auftritt plt-autovermietung.de übernommen
 * (Impressum & AGB). Auf ausdrücklichen Kundenwunsch unverändert.
 *
 * Struktur: jeweils { heading, paragraphs[] }-Blöcke, die vom LegalContent-
 * Renderer ausgegeben werden. Absätze sind als Klartext hinterlegt.
 */

export type LegalBlock = {
  heading?: string;
  paragraphs: string[];
};

export const impressum: { title: string; blocks: LegalBlock[] } = {
  title: "Impressum",
  blocks: [
    {
      heading: "Angaben gemäß § 5 TMG:",
      paragraphs: [
        "PLT Autovermietung GbR\nHeike & Peter Ververgaert\nAn der Horst 37\n47652 Weeze",
      ],
    },
    {
      heading: "Vertreten durch:",
      paragraphs: ["Peter Ververgaert"],
    },
    {
      heading: "Kontakt:",
      paragraphs: ["Telefon: 02837-962551\nMail: info(at)plt-autovermietung.de"],
    },
    {
      paragraphs: ["Quelle: Impressumgenerator, http://www.e-recht24.de"],
    },
    {
      heading: "Haftungsausschluss:",
      paragraphs: [],
    },
    {
      heading: "Haftung für Inhalte",
      paragraphs: [
        "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
      ],
    },
    {
      heading: "Haftung für Links",
      paragraphs: [
        "Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
      ],
    },
    {
      heading: "Urheberrecht",
      paragraphs: [
        "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
      ],
    },
    {
      heading: "Datenschutz",
      paragraphs: [
        "Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.",
        "Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.",
        "Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.",
      ],
    },
    {
      heading:
        "Datenschutzerklärung für die Nutzung von Facebook-Plugins (Like-Button)",
      paragraphs: [
        'Auf unseren Seiten sind Plugins des sozialen Netzwerks Facebook, 1601 South California Avenue, Palo Alto, CA 94304, USA integriert. Die Facebook-Plugins erkennen Sie an dem Facebook-Logo oder dem "Like-Button" ("Gefällt mir") auf unserer Seite. Eine Übersicht über die Facebook-Plugins finden Sie hier: http://developers.facebook.com/docs/plugins/ .',
        'Wenn Sie unsere Seiten besuchen, wird über das Plugin eine direkte Verbindung zwischen Ihrem Browser und dem Facebook-Server hergestellt. Facebook erhält dadurch die Information, dass Sie mit Ihrer IP-Adresse unsere Seite besucht haben. Wenn Sie den Facebook "Like-Button" anklicken während Sie in Ihrem Facebook-Account eingeloggt sind, können Sie die Inhalte unserer Seiten auf Ihrem Facebook-Profil verlinken. Dadurch kann Facebook den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Facebook erhalten. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von facebook unter http://de-de.facebook.com/policy.php',
        "Wenn Sie nicht wünschen, dass Facebook den Besuch unserer Seiten Ihrem Facebook-Nutzerkonto zuordnen kann, loggen Sie sich bitte aus Ihrem Facebook-Benutzerkonto aus.",
      ],
    },
    {
      heading: "Datenschutzerklärung für die Nutzung von Google Analytics",
      paragraphs: [
        "Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. (Google). Google Analytics verwendet sog. Cookies, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Im Falle der Aktivierung der IP-Anonymisierung auf dieser Webseite wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt.",
        "Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt.",
        "Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: http://tools.google.com/dlpage/gaoptout?hl=de .",
      ],
    },
    {
      paragraphs: [
        "Quellverweis: Disclaimer von eRecht24, dem Portal zum Internetrecht von Rechtsanwalt Sören Siebert, eRecht24 Facebook Datenschutzerklärung, Google Analytics Bedingungen",
      ],
    },
  ],
};

export const agb: { title: string; blocks: LegalBlock[]; stand: string } = {
  title: "Allgemeine Geschäftsbedingungen",
  stand: "Stand 02/2018",
  blocks: [
    {
      heading: "I. Allgemeines",
      paragraphs: [
        "Die Vertragsparteien sind einerseits die PLT Autovermietung, nachstehend PLT genannt, und der/die umseitig bezeichnete/n Mieter 1 und Mieter 2 andererseits. Der/Die Mieter haftet/n für alle Verpflichtungen aus diesem Vertrag als Gesamtschuldner. Der/Die Mieter bestätigt/en mit Unterzeichnung des Mietvertrages den Mietwagen vollgetankt, bzw. gemäß Aufzeichnungen im Übergabeprotokoll erhalten zu haben. Der umseitig eingetragene Kilometerstand wird als richtig anerkannt. Die jeweilige Preisliste sowie das Übergabeprotokoll sind ausdrücklich Bestandteil des Mietvertrages. Beanstandungen sind unmittelbar nach Fahrzeugübergabe gegenüber der PLT geltend zu machen. Nebenabreden bedürfen der Schriftform und müssen von der PLT schriftlich bestätigt werden.",
      ],
    },
    {
      heading: "II. Nutzung des Mietfahrzeuges",
      paragraphs: [
        "Das Kraftfahrzeug darf nur von dem/n Mieter/n selbst, sowie den bei dem/n Mieter/n angestellten Berufskraftfahrern in dessen Auftrag geführt werden. Voraussetzung ist in allen Fällen eine gültige Fahrerlaubnis, das von der PLT vorgeschriebene Mindestalter und ausreichend Fahrpraxis mit vergleichbaren Fahrzeugtypen. Eine Weitergabe und/oder Weitervermietung ist ausdrücklich untersagt. Sollte entgegen diesem Vertrag ein Nichtberechtigter das Fahrzeug führen, so haftet/n der/die Mieter wie bei eigenem Verschulden in voller Höhe. Die Nutzung des Mietwagens zur gewerblichen Personen- und Güterbeförderung ist nur bei besonderer vertraglicher Vereinbarung und unter Beachtung der gesetzlichen Bestimmungen gestattet. Dem/n Mieter/n ist die Benutzung des Fahrzeuges außerhalb der Bundesrepublik Deutschland ausdrücklich nicht gestattet. Fahrten außerhalb der Bundesrepublik Deutschland sind nur in Ausnahmefällen möglich und bedürfen ausdrücklich der schriftlichen Genehmigung von PLT. Es ist dem/den Mieter/n untersagt das Mietfahrzeug zum Abschleppen, zu motorsportlichen Veranstaltungen, Testzwecken, Geländefahrten, kriminellen und/oder ähnlichen, dem wirklichen Gebrauch widersprechenden Handlungen zu benutzen, auch wenn diese nur nach dem Recht des Tatortes mit Strafe bedroht sind. Der/Die Mieter verpflichtet/n sich, das Fahrzeug schonend zu behandeln, die im Zusammenhang mit der Anmietung stehenden gesetzlichen Bestimmungen zu beachten und den Wagen gegen Diebstahl sorgfältig zu sichern. Die Verkehrssicherheit ist während der gesamten Mietzeit regelmäßig zu überprüfen. Wird während der Mietzeit eine Reparatur notwendig um den Betrieb und/oder die Verkehrssicherheit des Fahrzeuges zu gewährleisten, so übernimmt die PLT die anfallenden Reparaturkosten, wenn der/die Mieter oder Fahrer das Einverständnis eingeholt hat/haben. Diese Verpflichtung entfällt bei Bagatellschäden und zu erwartenden Reparaturkosten unter 50,00 €. Dies gilt jedoch nicht, wenn der/die Mieter nach den Geschäftsbedingungen haftet/n. Bei Versagen des Kilometerzählers ist die PLT unverzüglich zu unterrichten und die Weisungen zu beachten. Bei Nichtbeachtung ist die PLT berechtigt die wahrscheinliche Fahrstrecke gemäß Kartenmaterial zu bestimmen.",
      ],
    },
    {
      heading: "III. Mietpreis, Mietdauer und Fahrzeugrückgabe",
      paragraphs: [
        "Der Mietpreis ergibt sich aus der umseitigen Vereinbarung. Sollte der Preis nicht eingesetzt sein, so gilt der Preis der jeweils gültigen Preisliste. Der Mietpreis beinhaltet Wartungsdienst, Ölverbrauch, übliche Verschleißreparaturen und eine Haftpflichtversicherung. Darüber hinaus ist eine Haftungsbegrenzung nach Art der Vollkasko durch die die Haftungsobergrenze (Selbstbehalt) gemäß Preisliste beschränkt ist, enthalten. Die Mindestmietdauer beträgt 24 Stunden. Eine Überschreitung um mehr als eine Stunde gilt als weiterer Miettag. Ausgenommen von dieser Regelung sind sogenannte Spezialtarife, die jeweils als solche gekennzeichnet sind. Die Tarife der Wochenpauschale (= 7 Tage) sowie der Monatspauschale (= 28 Tage) sind während der Mietlaufzeit nicht änderbar. Eine Anpassung der Tarife bei Mietzeitverkürzung ist ausgeschlossen. Bei Anschlussmietverträgen gelten die Bedingungen des Vorvertrages weiter, es sei denn, es wurde schriftlich etwas anderes vereinbart. Das Fahrzeug ist bei Ablauf der vereinbarten Mietdauer an der vereinbarten Mietstation während der Öffnungszeiten zurückzugeben. Erfolgt die Rückgabe nicht an der Anmietstation, so trägt/tragen der/die Mieter die Kosten für die Rückführung zur Anmietstation. Berechnet werden die Kosten von der Anmietstation bis zum Fahrzeugstandort und Rückfahrt auf Basis der gefahrenen Kilometer und dem Zeitaufwand gemäß der jeweils gültigen Preisliste. Die Öffnungszeiten sind dem Aushang in den Geschäftsräumen der PLT zu entnehmen. Grundsätzlich ist die Fahrzeugrückgabe nur während der Öffnungszeiten möglich. Nach schriftlicher Vereinbarung und Berechnung einer Gebühr ist eine Rückgabe auch außerhalb der Öffnungszeiten möglich. Hierbei ist zu beachten, dass das Mietfahrzeug bis zum Beginn der nächsten Geschäftszeit in der Verantwortung des/der jeweiligen Mieter/s verbleibt, auch wenn die Fahrzeugschlüssel in den dafür vorgesehenen Nachtbriefkasten eingeworfen wurden. Das Fahrzeug ist vollgetankt zurückzugeben. Nicht vollgetankte Fahrzeuge werden zum Servicepreis der jeweilig gültigen Preisliste dem/der Mieter nachbelastet. Für gewünschte Zu- und Rückführungen berechnet die PLT die in der Preisliste ausgewiesene Servicepauschale. Eine Verlängerung der Mietdauer ist der PLT 24 Stunden im Voraus anzukündigen und muss schriftlich genehmigt werden. Bei nicht rechtzeitiger Rückgabe des Fahrzeuges ist/sind der/die Mieter neben der Entrichtung des vollen Mietpreises verpflichtet, eine Vertragsstrafe in Höhe von 60,00 € inklusive MwSt. pro angefangenem Miettag zu bezahlen. Darüber hinaus behält sich die PLT höhere, nachgewiesene Schadensersatzansprüche vor. Bei Vertragsverletzung durch den/die Mieter oder dessen/deren Fahrer ist die PLT berechtigt, das Mietverhältnis fristlos und mit sofortiger Wirkung zu kündigen. Der/Die Mieter ist/sind damit einverstanden, dass die PLT auch gegen den Willen des/der Mieter/s das Fahrzeug aus wichtigem Grund ohne Einhaltung einer Frist wieder in Besitz nehmen kann. Bei verspäteter – nicht genehmigter – Rückgabe haftet/n der/die Mieter für alle nach Vertragsablauf entstehenden Schäden am Fahrzeug in voller Höhe, ungeachtet eines Verschuldens oder einer vereinbarten Haftungsbegrenzung. Bei einem Fahrzeugtausch gelten die Geschäftsbedingungen unverändert weiter. Bei Barvermietungen ist eine Vorauszahlung in Höhe des zu erwartenden Mietpreises zuzüglich des vereinbarten Selbstbehaltes zu leisten. Die Restforderung der PLT wird mit Rückgabe des Fahrzeugs sofort fällig, auch wenn sie sich bereit erklärt hat, eine Rechnung direkt an eine Haftpflichtversicherung weiterzuleiten. Stornierungen werden nur bis 24 Stunden vor der vereinbarten Abholzeit entgegengenommen und werden mit einer Kostenpauschale in Höhe von 25,00 € berechnet, ansonsten ist der volle Mietpreis zu entrichten.",
      ],
    },
    {
      heading: "IV. Pflichten des Vermieters",
      paragraphs: [
        "Die PLT überlässt dem/den Mieter/n ein verkehrssicheres und technisch einwandfreies Fahrzeug nebst Zubehör zum Gebrauch. Der/Die Mieter und jeder berechtigte Fahrer ist/sind durch eine Kraftfahrt-Haftpflichtversicherung mindestens in dem Umfang geschützt, der in dem Zulassungsland des Fahrzeuges gesetzlich vorgeschrieben oder üblich ist. Die Haftpflichtversicherung ist im Mietpreis des Fahrzeuges bereits enthalten. In oder auf dem Fahrzeug befindliche Sachen sind hierdurch nicht mitversichert.",
        "Schäden nach Art der Teilkaskoversicherung (TK) z. B. bei Brand, Explosion, Glasbruch, Wildschäden und Elementarereignisse können durch Zuzahlung abgedeckt werden. Schäden nach Art der Vollkaskoversicherung (VK) z. B. selbstverschuldete Unfälle, Unfallflucht des Verursachers, etc. können durch Zuzahlung bis auf Höhe des Selbstbehaltes (SB) reduziert werden. Der Versicherungsschutz bezieht sich nur auf das Fahrzeug sowie dessen Fahrzeugteile. Der/Die Mieter kann/können seine/ihre Haftung bis zur Höhe eines nicht ausschließbaren Selbstbehaltes reduzieren. Der Selbstbehalt ist dabei pro Schadenfall bis zur vereinbarten Höhe zu entrichten. Die Kosten für die Haftungsbegrenzung sind der jeweils gültigen Preisliste sowie den umseitigen Vereinbarungen zu entnehmen. Die Haftungsreduzierung erfolgt ausschließlich durch separaten, schriftlichen Abschluss. Eine Insassenunfallversicherung (IU) kann auf Wunsch zu dem in der jeweils gültigen Preisliste angegebenen Tarif und Deckungsgrenzen abgeschlossen werden. Der Abschluss einer IU erfolgt nur wirksam durch Abschluss und Bestätigung auf dem umseitigen Vertrag und Zahlung einer entsprechenden Gebühr. Der Vermieter verpflichtet sich, das reservierte Fahrzeug bis maximal zwei Stunden über den vereinbarten Termin hinaus bereitzuhalten.",
      ],
    },
    {
      heading: "V. Verhalten des Mieters bei Unfall und/oder sonstigen Schadenfällen",
      paragraphs: [
        "Im Falle eines Schadenereignisses, auch bei nur geringfügigen Schäden, und/oder bei Schadenfällen auf Privatgelände ist/sind der/die Mieter/Fahrer verpflichtet, unverzüglich die Polizei hinzuzuziehen und die PLT zu verständigen, am Unfall/Schadenfall Beteiligte und Zeugen namentlich und mit Anschrift zu erfassen und keine Schuldanerkenntnisse gegenüber Dritten abzugeben. Notwendige Bergungsmaßnahmen und Reparaturen werden in jedem Fall von der PLT veranlasst. Der/Die Mieter verpflichtet/n sich, der PLT unverzüglich einen detaillierten Unfallbericht zu erstellen. Wichtig: Bei Missachtung der vorgenannten Pflichten haftet/n der/die Mieter für den entstandenen Schaden, auch bei nur leicht fahrlässigen Handeln, in vollem Umfang.",
      ],
    },
    {
      heading: "VI. Haftung des/der Mieter",
      paragraphs: [
        "Der/Die Mieter haftet/n für alle von ihm/ihnen zu vertretenden rechtlichen, finanziellen und sonstigen Nachteile und Schäden, die während der Mietzeit, auch durch auftretende mangelnde Verkehrssicherheit des Mietfahrzeuges, am und durch das Mietfahrzeug entstehen. Hinzu kommt die uneingeschränkte Verpflichtung zum Ersatz der Wertminderung, der Gutachter- und Abschleppkosten, sowie des Tagesgrund- und Kilometerpreises gemäß jeweils gültiger Preisliste, wobei von einer durchschnittlichen Fahrstrecke von 100 km ausgegangen wird. Darüber hinaus hält sich die PLT Schadenersatzansprüche vor. Der/Die Mieter hat/haben die Möglichkeit, einen geringeren Schaden der PLT nachzuweisen.",
      ],
    },
    {
      heading: "VII. Haftungsreduzierung",
      paragraphs: [
        "1. Der/Die Mieter kann/können die Haftung nach Ziffer IV (TK/VK) reduzieren und haftet/n entsprechend in umseitig vereinbartem Umfang. Für den Fall, dass keine Haftungsreduzierung vereinbart wurde, haftet/n der/die Mieter für den von ihm/ihnen verursachten Schaden in voller Höhe.",
        "2. Trotz einer vereinbarten Haftungsreduzierung haftet/n der/die Mieter unbegrenzt für den gesamten Schaden, wenn er/sie diesen grob fahrlässig oder vorsätzlich herbeigeführt hat. Als grob fahrlässig gilt unter anderem das Führen des Fahrzeuges unter Alkohol-, Medikamenten- und/oder Drogeneinfluss.",
        "3. Bei Missachtung der Durchfahrtshöhe und -breite, z. B. bei Brücken, Balkonen, etc. haftet/n der/die Mieter für Schäden an Karosserie und Aufbauten in voller Höhe.",
        "4. Der/Die Mieter haftet/n in vollem Umfang für Schäden, Folgeschäden, Verunreinigung wie z. B. beim Auslaufen von Chemikalien, etc. die beim Gebrauch des Fahrzeuges entstehen. Diese Schadenhaftung kann ausdrücklich nicht durch den Abschluss einer Haftungsreduzierung ausgeschlossen oder gemindert werden.",
        "5. Der/Die Mieter haftet/n in vollem Umfang für Schäden am Fahrzeug, die durch Ladegut entstehen, z. B. durch unsachgemäßes Verstauen und Sichern der Ladung, ungenügendem Verschluss von Fässern, etc.. Diese Schadenhaftung kann ausdrücklich nicht durch den Abschluss einer Haftungsreduzierung ausgeschlossen oder gemindert werden.",
        "6. Der/Die Mieter haftet/n ebenfalls in vollem Umfang, auch bei Abschluss einer Haftungsreduzierung, bei Beschädigung und/oder Verschmutzung der Polster (z. B. durch Tiere, Rauchen, etc.). bei Felgen- und Reifenschäden sowie Parkschäden.",
        "7. Der Abschluss einer Haftungsreduzierung erfolgt wirksam nur durch separate schriftliche Vereinbarung auf der Vorderseite des Vertrages und Zahlung der Tagesgebühr der jeweils gültigen Preisliste. Telefonische Vereinbarungen sind nicht wirksam. Die Haftungsreduzierung gilt nur bis zum Ablauf der schriftlich vereinbarten Vertragsdauer.",
        "8. Im Falle eines Diebstahls haftet/n der/die Mieter in Höhe des Fahrzeugwertes.",
      ],
    },
    {
      heading: "VIII. Zahlungsbedingungen",
      paragraphs: [
        "Es wird eine Mietvorauszahlung in Höhe der voraussichtlichen Miet- und Nebenkosten, zzgl. des vereinbarten Selbstbehaltes (SB) erhoben. Kreditkarten werden gemäß Aushang und nach den Bedingungen des jeweiligen Ausstellers akzeptiert. Die Rechnungslegung erfolgt nach den Bedingungen der jeweils gültigen Preisliste der PLT. Der/Die Mieter versichert/n ausdrücklich, dass er/sie in der Lage ist/sind, den Restmietpreis bei Rückgabe des Fahrzeuges zu begleichen und keine eidesstattliche Versicherung über sein/ihr Vermögen abgegeben hat/haben.",
      ],
    },
    {
      heading: "IX. Datenschutz",
      paragraphs: [
        "Der/Die Mieter als auch deren/dessen berechtigte/r Fahrer ist/sind damit einverstanden, dass die PLT seine/ihre, im Zusammenhang mit dem Vermietverhältnis stehenden, persönlichen Daten speichert. Die Bearbeitung der persönlichen Daten erfolgt nach den Bestimmungen des Bundesdatenschutzgesetz (BDSG) und wird Dritten gegenüber nicht zugänglich gemacht. Für den Fall, dass bei der Anmietung unrichtige Angaben gemacht werden, das Fahrzeug nicht am Ende der vereinbarten Mietzeit zurückgegeben wird und/oder der von dem/den Mieter/n ausgestellte Scheck nicht eingelöst oder Wechsel protestiert werden, ist die PLT berechtigt, die persönlichen Daten gemäß den Bestimmungen des BDSG an Dritte weiterzuleiten (§§27, ff. BDSG) und in den zentralen Warnring einzugeben.",
      ],
    },
    {
      heading: "X. Erfüllungsort und Gerichtsstand",
      paragraphs: [
        "Erfüllungsort aller Ansprüche aus diesem Vertrag ist Weeze. Ist/Sind der/die Mieter Vollkaufmann/-leute, so ist das Amtsgericht Geldern ausschließlicher Gerichtsstand für alle Rechtsstreitigkeiten.",
      ],
    },
    {
      heading: "XI. Fahrzeuge mit einem Ortungssystem (GPS)",
      paragraphs: [
        "Alle Fahrzeuge, PKW und LKW, der PLT Autovermietung sind mit einer Technik ausgestattet, die die Position des Fahrzeugs bestimmbar macht. Sie willigen ein, dass PLT GPS-Koordinaten erhebt, speichert oder nutzt, wenn Sie die vertraglich vereinbarte Mietzeit ohne Kenntnis von PLT überschreiten, oder das Fahrzeug außerhalb des vertraglich vereinbarten Gebietes nutzen. Die Erhebung, Speicherung und Nutzung der Daten dient ausschließlich dem Zweck des Schutzes unserer Fahrzeuge. Wir weisen darauf hin, dass PLT aufgrund von Anordnungen staatlicher Stellen zur Herausgabe dieser Daten verpflichtet werden kann.",
        "Die Fahrzeuge der PLT Autovermietung sind teilweise serienmäßig mit Informations- und Kommunikationssystemen wie z. B. Navigationsgeräten und Mobiltelefonsystemen ausgerüstet. PLT verfolgt mit dem Angebot dieser Informations- und Kommunikationssysteme nicht den Zweck, personenbezogene Daten der Mieter und Fahrer zu sammeln. Ihnen wird im eigenen Interesse empfohlen, vor Rückgabe des Fahrzeugs das Informations- und Kommunikationssystem des Fahrzeugs auf Werkseinstellung zurückzusetzen und damit alle gesammelten Daten aus den Navigationsgeräten und Mobiltelefonsystemen zu löschen.",
      ],
    },
    {
      heading: "XII. Schlussbemerkungen",
      paragraphs: [
        "Sollten einzelne Bestimmungen dieses Vertrages ganz oder teilweise nicht rechtswirksam sein oder ihre Rechtswirksamkeit zwischenzeitlich ganz oder teilweise verlieren, so soll hierdurch die Gültigkeit der übrigen Bestimmungen nicht berührt werden. Anstelle der ungültigen Bestimmungen soll eine rechtswirksame Bestimmung Geltung erlangen, die dem Sinn der ursprünglichen Bestimmung am nächsten kommt.",
      ],
    },
  ],
};
